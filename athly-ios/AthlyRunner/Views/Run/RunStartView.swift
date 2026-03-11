import SwiftUI

struct RunStartView: View {
    @EnvironmentObject var locationManager: LocationManager
    @StateObject private var viewModel: RunViewModel

    init() {
        // Will be properly initialized with locationManager in .onAppear
        _viewModel = StateObject(wrappedValue: RunViewModel(locationManager: LocationManager()))
    }

    @State private var isInitialized = false

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isActive {
                    RunTrackingView(viewModel: viewModel)
                } else if viewModel.showSummary {
                    RunSummaryView(viewModel: viewModel)
                } else {
                    preRunView
                }
            }
            .navigationTitle(viewModel.isActive ? "" : "Correr")
            .navigationBarTitleDisplayMode(.inline)
        }
        .onAppear {
            if !isInitialized {
                viewModel.updateLocationManager(locationManager)
                isInitialized = true
            }
        }
    }

    private var preRunView: some View {
        VStack(spacing: 32) {
            Spacer()

            if !locationManager.hasPermission {
                permissionView
            } else {
                readyView
            }

            Spacer()
        }
    }

    private var permissionView: some View {
        VStack(spacing: 20) {
            Image(systemName: "location.slash.circle.fill")
                .font(.system(size: 64))
                .foregroundStyle(.orange)

            Text("Permissao de localizacao necessaria")
                .font(.title3)
                .fontWeight(.semibold)

            Text("Para rastrear sua corrida, precisamos acessar sua localizacao.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)

            Button("Permitir localizacao") {
                locationManager.requestAlwaysPermission()
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
        }
    }

    private var readyView: some View {
        VStack(spacing: 40) {
            VStack(spacing: 8) {
                Image(systemName: "figure.run")
                    .font(.system(size: 64))
                    .foregroundStyle(Color.accentColor)

                Text("Pronto para correr?")
                    .font(.title2)
                    .fontWeight(.semibold)
            }

            Button {
                viewModel.startRun()
            } label: {
                ZStack {
                    Circle()
                        .fill(Color.accentColor)
                        .frame(width: 120, height: 120)
                        .shadow(color: .accentColor.opacity(0.4), radius: 16, y: 8)

                    Text("INICIAR")
                        .font(.title3)
                        .fontWeight(.bold)
                        .foregroundStyle(.white)
                }
            }
        }
    }
}

// Extension to allow updating locationManager after init
extension RunViewModel {
    func updateLocationManager(_ manager: LocationManager) {
        self.tracker = RunTracker(locationManager: manager)
    }
}
