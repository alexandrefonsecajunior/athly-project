import SwiftUI
import SwiftData
import MapKit

struct RunSummaryView: View {
    @ObservedObject var viewModel: RunViewModel
    @Environment(\.modelContext) private var modelContext

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 8) {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 56))
                        .foregroundStyle(.green)

                    Text("Corrida finalizada!")
                        .font(.title2)
                        .fontWeight(.bold)

                    if let result = viewModel.lastRunResult {
                        Text(result.startDate.formatted(date: .abbreviated, time: .shortened))
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                }
                .padding(.top, 24)

                if let result = viewModel.lastRunResult {
                    // Route map
                    if !result.locations.isEmpty {
                        summaryMap(locations: result.locations)
                            .frame(height: 200)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .padding(.horizontal, 16)
                    }

                    // Stats grid
                    statsGrid(result: result)

                    // Splits
                    if !result.splits.isEmpty {
                        splitsSection(splits: result.splits)
                    }
                }

                // Actions
                VStack(spacing: 12) {
                    Button {
                        Task {
                            await viewModel.saveRun(modelContext: modelContext)
                        }
                    } label: {
                        HStack {
                            if viewModel.isSaving {
                                ProgressView()
                                    .tint(.white)
                            } else {
                                Image(systemName: "square.and.arrow.down")
                                Text("Salvar corrida")
                            }
                        }
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.accentColor)
                        .foregroundStyle(.white)
                        .cornerRadius(12)
                    }
                    .disabled(viewModel.isSaving)

                    Button("Descartar", role: .destructive) {
                        viewModel.discardRun()
                    }
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 32)
            }
        }
        .navigationBarBackButtonHidden(true)
    }

    private func summaryMap(locations: [CLLocation]) -> some View {
        let coords = locations.map { $0.coordinate }
        let region = regionForCoordinates(coords)

        return Map {
            MapPolyline(coordinates: coords)
                .stroke(Color.accentColor, lineWidth: 3)

            if let first = coords.first {
                Annotation("", coordinate: first) {
                    Circle().fill(.green).frame(width: 10, height: 10)
                }
            }
            if let last = coords.last {
                Annotation("", coordinate: last) {
                    Circle().fill(.red).frame(width: 10, height: 10)
                }
            }
        }
        .mapStyle(.standard)
        .disabled(true)
    }

    private func statsGrid(result: RunResult) -> some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 16) {
            statCard(
                icon: "ruler",
                value: String(format: "%.2f km", result.distanceMeters / 1000),
                label: "Distancia"
            )
            statCard(
                icon: "clock",
                value: formatDuration(result.durationSeconds),
                label: "Duracao"
            )
            statCard(
                icon: "speedometer",
                value: formatPace(result.averagePaceSecondsPerKm),
                label: "Pace medio"
            )
            statCard(
                icon: "mountain.2",
                value: String(format: "%.0f m", result.elevationGainMeters),
                label: "Elevacao"
            )
            statCard(
                icon: "flame",
                value: String(format: "%.0f kcal", result.caloriesBurned),
                label: "Calorias"
            )
            statCard(
                icon: "number",
                value: "\(result.splits.count)",
                label: "Splits"
            )
        }
        .padding(.horizontal, 16)
    }

    private func statCard(icon: String, value: String, label: String) -> some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundStyle(Color.accentColor)

            Text(value)
                .font(.title3)
                .fontWeight(.bold)

            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private func splitsSection(splits: [SplitData]) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Splits")
                .font(.headline)
                .padding(.horizontal, 16)

            ForEach(Array(splits.enumerated()), id: \.offset) { index, split in
                HStack {
                    Text("Km \(split.kilometer)")
                        .fontWeight(.medium)

                    Spacer()

                    Text(split.formattedPace)
                        .font(.system(.body, design: .monospaced))
                        .fontWeight(.semibold)

                    Text("/km")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)

                if index < splits.count - 1 {
                    Divider().padding(.horizontal, 16)
                }
            }
        }
    }

    private func formatDuration(_ seconds: Double) -> String {
        let h = Int(seconds) / 3600
        let m = (Int(seconds) % 3600) / 60
        let s = Int(seconds) % 60
        if h > 0 { return String(format: "%d:%02d:%02d", h, m, s) }
        return String(format: "%02d:%02d", m, s)
    }

    private func formatPace(_ pace: Double) -> String {
        guard pace > 0, pace.isFinite, pace < 3600 else { return "--:--" }
        return String(format: "%d:%02d /km", Int(pace) / 60, Int(pace) % 60)
    }

    private func regionForCoordinates(_ coords: [CLLocationCoordinate2D]) -> MKCoordinateRegion {
        guard !coords.isEmpty else {
            return MKCoordinateRegion()
        }

        var minLat = coords[0].latitude
        var maxLat = coords[0].latitude
        var minLon = coords[0].longitude
        var maxLon = coords[0].longitude

        for coord in coords {
            minLat = min(minLat, coord.latitude)
            maxLat = max(maxLat, coord.latitude)
            minLon = min(minLon, coord.longitude)
            maxLon = max(maxLon, coord.longitude)
        }

        let padding = 1.3
        let span = MKCoordinateSpan(
            latitudeDelta: (maxLat - minLat) * padding + 0.002,
            longitudeDelta: (maxLon - minLon) * padding + 0.002
        )

        return MKCoordinateRegion(
            center: CLLocationCoordinate2D(
                latitude: (minLat + maxLat) / 2,
                longitude: (minLon + maxLon) / 2
            ),
            span: span
        )
    }
}
