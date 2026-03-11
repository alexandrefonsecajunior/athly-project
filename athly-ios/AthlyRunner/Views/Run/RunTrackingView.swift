import SwiftUI
import MapKit

struct RunTrackingView: View {
    @ObservedObject var viewModel: RunViewModel
    @State private var showStopConfirmation = false

    var body: some View {
        ZStack {
            // Map
            RunMapView(
                coordinates: viewModel.tracker.routeCoordinates,
                isTracking: viewModel.isRunning
            )
            .ignoresSafeArea(edges: .top)

            // Metrics overlay
            VStack {
                Spacer()
                metricsPanel
                controlsPanel
            }
        }
        .navigationBarHidden(true)
        .confirmationDialog(
            "Finalizar corrida?",
            isPresented: $showStopConfirmation,
            titleVisibility: .visible
        ) {
            Button("Finalizar e salvar") {
                viewModel.finishRun()
            }
            Button("Descartar", role: .destructive) {
                viewModel.discardRun()
            }
            Button("Continuar correndo", role: .cancel) {
                if viewModel.isPaused {
                    viewModel.resumeRun()
                }
            }
        }
    }

    private var metricsPanel: some View {
        VStack(spacing: 0) {
            // Main metrics
            HStack(spacing: 0) {
                metricItem(
                    value: viewModel.tracker.formattedDuration,
                    label: "TEMPO",
                    large: true
                )
            }
            .padding(.top, 20)

            HStack(spacing: 0) {
                metricItem(
                    value: viewModel.tracker.formattedDistance,
                    label: "KM"
                )

                Divider()
                    .frame(height: 50)

                metricItem(
                    value: viewModel.tracker.formattedPace,
                    label: "PACE /KM"
                )

                Divider()
                    .frame(height: 50)

                metricItem(
                    value: String(format: "%.0f", viewModel.tracker.elevationGain),
                    label: "ELEV (M)"
                )
            }
            .padding(.vertical, 12)
        }
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .padding(.horizontal, 16)
    }

    private func metricItem(value: String, label: String, large: Bool = false) -> some View {
        VStack(spacing: 4) {
            Text(value)
                .font(large ? .system(size: 48, weight: .bold, design: .monospaced) : .system(size: 28, weight: .bold, design: .monospaced))
                .minimumScaleFactor(0.7)

            Text(label)
                .font(.caption2)
                .fontWeight(.medium)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
    }

    private var controlsPanel: some View {
        HStack(spacing: 40) {
            if viewModel.isPaused {
                // Stop button
                Button {
                    showStopConfirmation = true
                } label: {
                    ZStack {
                        Circle()
                            .fill(.red)
                            .frame(width: 64, height: 64)

                        Image(systemName: "stop.fill")
                            .font(.title2)
                            .foregroundStyle(.white)
                    }
                }

                // Resume button
                Button {
                    viewModel.resumeRun()
                } label: {
                    ZStack {
                        Circle()
                            .fill(.green)
                            .frame(width: 80, height: 80)

                        Image(systemName: "play.fill")
                            .font(.title)
                            .foregroundStyle(.white)
                    }
                }
            } else {
                // Pause button
                Button {
                    viewModel.pauseRun()
                } label: {
                    ZStack {
                        Circle()
                            .fill(.orange)
                            .frame(width: 80, height: 80)
                            .shadow(color: .orange.opacity(0.4), radius: 12, y: 6)

                        Image(systemName: "pause.fill")
                            .font(.title)
                            .foregroundStyle(.white)
                    }
                }
            }
        }
        .padding(.vertical, 24)
        .padding(.bottom, 16)
    }
}

// MARK: - RunTracker convenience computed properties

extension RunTracker {
    var formattedDuration: String {
        let hours = Int(elapsedTime) / 3600
        let minutes = (Int(elapsedTime) % 3600) / 60
        let seconds = Int(elapsedTime) % 60
        if hours > 0 {
            return String(format: "%d:%02d:%02d", hours, minutes, seconds)
        }
        return String(format: "%02d:%02d", minutes, seconds)
    }

    var formattedDistance: String {
        String(format: "%.2f", distanceMeters / 1000.0)
    }

    var formattedPace: String {
        guard currentPaceSecondsPerKm > 0, currentPaceSecondsPerKm.isFinite,
              currentPaceSecondsPerKm < 3600 else {
            return "--:--"
        }
        let minutes = Int(currentPaceSecondsPerKm) / 60
        let seconds = Int(currentPaceSecondsPerKm) % 60
        return String(format: "%d:%02d", minutes, seconds)
    }
}
