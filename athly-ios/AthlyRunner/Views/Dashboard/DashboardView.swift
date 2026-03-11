import SwiftUI
import SwiftData

struct DashboardView: View {
    @Query(sort: \RunSession.startDate, order: .reverse)
    private var recentRuns: [RunSession]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Weekly summary
                    weeklySummaryCard

                    // Last run
                    if let lastRun = recentRuns.first {
                        lastRunCard(lastRun)
                    } else {
                        emptyState
                    }

                    // Weekly stats
                    weeklyStatsView
                }
                .padding(16)
            }
            .navigationTitle("Athly Runner")
        }
    }

    private var weeklySummaryCard: some View {
        let weekRuns = recentRuns.filter { run in
            Calendar.current.isDate(run.startDate, equalTo: Date(), toGranularity: .weekOfYear)
        }
        let totalKm = weekRuns.reduce(0) { $0 + $1.distanceKm }
        let totalTime = weekRuns.reduce(0) { $0 + $1.durationSeconds }

        return VStack(spacing: 16) {
            HStack {
                Text("Esta semana")
                    .font(.headline)
                Spacer()
                Text("\(weekRuns.count) corridas")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            HStack(spacing: 32) {
                VStack(spacing: 4) {
                    Text(String(format: "%.1f", totalKm))
                        .font(.system(size: 32, weight: .bold, design: .rounded))
                    Text("km")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                VStack(spacing: 4) {
                    Text(formatDuration(totalTime))
                        .font(.system(size: 32, weight: .bold, design: .rounded))
                    Text("tempo")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(20)
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }

    private func lastRunCard(_ run: RunSession) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Ultima corrida")
                    .font(.headline)
                Spacer()
                Text(run.startDate.formatted(date: .abbreviated, time: .omitted))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            HStack(spacing: 24) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(run.formattedDistance)
                        .font(.title)
                        .fontWeight(.bold)
                    Text("km")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text(run.formattedDuration)
                        .font(.title)
                        .fontWeight(.bold)
                    Text("duracao")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text(run.formattedPace)
                        .font(.title)
                        .fontWeight(.bold)
                    Text("pace /km")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(20)
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }

    private var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "figure.run")
                .font(.system(size: 48))
                .foregroundStyle(.secondary)

            Text("Nenhuma corrida ainda")
                .font(.headline)

            Text("Va para a aba Correr e registre sua primeira corrida!")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding(40)
        .frame(maxWidth: .infinity)
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }

    private var weeklyStatsView: some View {
        let days = (0..<7).map { offset in
            Calendar.current.date(byAdding: .day, value: -offset, to: Date())!
        }.reversed()

        return VStack(alignment: .leading, spacing: 12) {
            Text("Ultimos 7 dias")
                .font(.headline)

            HStack(spacing: 8) {
                ForEach(Array(days.enumerated()), id: \.offset) { _, day in
                    let dayRuns = recentRuns.filter {
                        Calendar.current.isDate($0.startDate, inSameDayAs: day)
                    }
                    let km = dayRuns.reduce(0) { $0 + $1.distanceKm }

                    VStack(spacing: 4) {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(km > 0 ? Color.accentColor : Color(.systemGray5))
                            .frame(height: max(8, CGFloat(km) * 8))
                            .frame(maxHeight: 60)

                        Text(day.formatted(.dateTime.weekday(.narrow)))
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity)
                }
            }
        }
        .padding(20)
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }

    private func formatDuration(_ seconds: Double) -> String {
        let h = Int(seconds) / 3600
        let m = (Int(seconds) % 3600) / 60
        if h > 0 { return String(format: "%dh%02d", h, m) }
        return String(format: "%dmin", m)
    }
}
