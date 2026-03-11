import SwiftUI

struct RegisterView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @Environment(\.dismiss) var dismiss

    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""

    private var passwordsMatch: Bool {
        !password.isEmpty && password == confirmPassword
    }

    private var isFormValid: Bool {
        !name.isEmpty && !email.isEmpty && passwordsMatch
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                VStack(spacing: 8) {
                    Text("Criar conta")
                        .font(.title)
                        .fontWeight(.bold)

                    Text("Comece a registrar suas corridas")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .padding(.top, 32)

                VStack(spacing: 16) {
                    TextField("Nome", text: $name)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.name)

                    TextField("Email", text: $email)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.emailAddress)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)

                    SecureField("Senha", text: $password)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.newPassword)

                    SecureField("Confirmar senha", text: $confirmPassword)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.newPassword)

                    if !confirmPassword.isEmpty && !passwordsMatch {
                        Text("As senhas não coincidem")
                            .font(.caption)
                            .foregroundStyle(.red)
                    }

                    if let error = authViewModel.errorMessage {
                        Text(error)
                            .font(.caption)
                            .foregroundStyle(.red)
                            .multilineTextAlignment(.center)
                    }

                    Button {
                        Task {
                            await authViewModel.register(name: name, email: email, password: password)
                            if authViewModel.isAuthenticated {
                                dismiss()
                            }
                        }
                    } label: {
                        Group {
                            if authViewModel.isLoading {
                                ProgressView()
                                    .tint(.white)
                            } else {
                                Text("Registrar")
                                    .fontWeight(.semibold)
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(isFormValid ? Color.accentColor : Color.gray)
                        .foregroundStyle(.white)
                        .cornerRadius(12)
                    }
                    .disabled(!isFormValid || authViewModel.isLoading)
                }
                .padding(.horizontal, 24)

                Spacer()
            }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") { dismiss() }
                }
            }
        }
    }
}
