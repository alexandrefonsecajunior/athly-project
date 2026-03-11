import SwiftUI
import SwiftData

struct HistoryView: View {
    @Query(sort: \RunSession.startDate, order: .reverse)
    private var runs: [RunSession]

    var body: some View {
        NavigationStack {
            Group {
                if runs.isEmpty {
                    ContentUnavailableView(
                        "Sem corridas",
                        systemImage: "figure.run",
                        description: Text("Suas corridas aparecerao aqui apos registra-las.")
                    )
                } else {
                    List(runs) { run in
                        runRow(run)
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Historico")
        }
    }

    private func runRow(_ run: RunSession) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "figure.run")
                    .foregroundStyle(Color.accentColor)

                Text("Corrida")
                    .fontWeight(.semibold)

                Spacer()

                Text(run.startDate.formatted(date: .abbreviated, time: .shortened))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            HStack(spacing: 20) {
                Label(run.formattedDistance + " km", systemImage: "ruler")
                Label(run.formattedDuration, systemImage: "clock")
                Label(run.formattedPace + " /km", systemImage: "speedometer")
            }
            .font(.caption)
            .foregroundStyle(.secondary)

            HStack(spacing: 8) {
                if run.synced {
                    Label("Sincronizado", systemImage: "checkmark.icloud")
                        .font(.caption2)
                        .foregroundStyle(.green)
                } else {
                    Label("Local", systemImage: "iphone")
                        .font(.caption2)
                        .foregroundStyle(.orange)
                }
            }
        }
        .padding(.vertical, 4)
    }
}
