import SwiftUI
import SwiftData

@main
struct AthlyRunnerApp: App {
    @StateObject private var authViewModel = AuthViewModel()
    @StateObject private var locationManager = LocationManager()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(authViewModel)
                .environmentObject(locationManager)
        }
        .modelContainer(for: [RunSession.self, RoutePoint.self, Split.self])
    }
}
