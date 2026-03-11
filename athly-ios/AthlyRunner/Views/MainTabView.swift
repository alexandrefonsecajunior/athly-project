import SwiftUI

struct MainTabView: View {
    @EnvironmentObject var locationManager: LocationManager

    var body: some View {
        TabView {
            DashboardView()
                .tabItem {
                    Label("Inicio", systemImage: "house.fill")
                }

            RunStartView()
                .tabItem {
                    Label("Correr", systemImage: "figure.run")
                }

            HistoryView()
                .tabItem {
                    Label("Historico", systemImage: "clock.arrow.trianglehead.counterclockwise.rotate.90")
                }

            ProfileView()
                .tabItem {
                    Label("Perfil", systemImage: "person.fill")
                }
        }
        .tint(Color("AccentColor"))
    }
}
