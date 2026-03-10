import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, GradientText, Badge, Divider } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/services/authService";
import toast from "react-hot-toast";

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = await login(
        email || "alexandre@email.com",
        password || "1234",
      );
      setSession({
        user: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      });
      navigate("/dashboard");
    } catch {
      toast.error("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full">
        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="/src/assets/icons/main.png"
              alt="Athly"
              className="w-24 h-24 animate-pulse-glow"
            />
            <GradientText variant="neon" animated>
              <h1 className="text-5xl font-bold">Athly</h1>
            </GradientText>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Seu personal trainer inteligente
          </p>
          <Badge variant="neon" className="mt-4">
            ✨ Powered by AI
          </Badge>
        </div>

        {/* Login Card */}
        <Card variant="glow" padding="lg" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 gradient-primary opacity-10 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Entrar na conta
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                icon={<span>📧</span>}
              />
              <Input
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<span>🔒</span>}
              />

              <Divider spacing="sm" />

              <Button
                type="submit"
                variant="gradient"
                fullWidth
                size="lg"
                loading={loading}
                glow
              >
                🚀 Entrar
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--color-text-tertiary)]">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-400)] font-semibold transition-colors"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">🏋️</div>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Treinos IA
            </p>
          </div>
          <div>
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Análises
            </p>
          </div>
          <div>
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-xs text-[var(--color-text-tertiary)]">Metas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
