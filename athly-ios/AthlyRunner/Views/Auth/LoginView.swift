import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var email = ""
    @State private var password = ""
    @State private var showRegister = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 32) {
                Spacer()

                // Logo
                VStack(spacing: 12) {
                    Image(systemName: "figure.run.circle.fill")
                        .font(.system(size: 80))
                        .foregroundStyle(Color.accentColor)

                    Text("Athly Runner")
                        .font(.largeTitle)
                        .fontWeight(.bold)

                    Text("Seu tracker de corrida inteligente")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                // Form
                VStack(spacing: 16) {
                    TextField("Email", text: $email)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.emailAddress)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)

                    SecureField("Senha", text: $password)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.password)

                    if let error = authViewModel.errorMessage {
                        Text(error)
                            .font(.caption)
                            .foregroundStyle(.red)
                            .multilineTextAlignment(.center)
                    }

                    Button {
                        Task {
                            await authViewModel.login(email: email, password: password)
                        }
                    } label: {
                        Group {
                            if authViewModel.isLoading {
                                ProgressView()
                                    .tint(.white)
                            } else {
                                Text("Entrar")
                                    .fontWeight(.semibold)
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.accentColor)
                        .foregroundStyle(.white)
                        .cornerRadius(12)
                    }
                    .disabled(email.isEmpty || password.isEmpty || authViewModel.isLoading)
                }
                .padding(.horizontal, 24)

                Spacer()

                Button("Criar conta") {
                    showRegister = true
                }
                .padding(.bottom, 32)
            }
            .sheet(isPresented: $showRegister) {
                RegisterView()
            }
        }
    }
}
