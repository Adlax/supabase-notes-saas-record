import Link from "next/link";

const features = [
	"Créer, modifier et supprimer vos notes personnelles",
	"Ajouter une image de couverture à chaque note",
	"Connexion sécurisée par magic link (sans mot de passe)",
	"Mises à jour en temps réel sur le dashboard",
];

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"];

function AboutPage() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
			{/* Header */}
			<header className="mb-10 text-center">
				<p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--primary-700)]">Note Mate</p>
				<h1 className="text-3xl font-bold sm:text-4xl">About</h1>
				<p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
					Un espace simple pour capturer vos idées, organiser vos pensées et retrouver vos notes quand vous en avez besoin.
				</p>
			</header>
			{/* Main */}
			<div className="space-y-8">
				<section className="rounded-xl border bg-white p-6 shadow-[4px_0_15px_rgba(0,0,0,0.06)]">
					<h2 className="mb-3 text-xl font-bold">Fonctionnalités</h2>
					<ul className="space-y-2 text-[var(--text-secondary)]">
						{features.map((feature) => (
							<li key={feature} className="flex gap-2">
								<span className="text-[var(--primary-500)]">•</span>
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</section>
				<section className="rounded-xl border bg-white p-6 shadow-[4px_0_15px_rgba(0,0,0,0.06)]">
					<h2 className="mb-3 text-xl font-bold">Le projet</h2>
					<p className="text-[var(--text-secondary)] leading-relaxed">
						Note Mate est un projet éducatif réalisé par <strong className="text-[var(--text-primary)]">Adlax</strong>,
						conçu pour explorer la création d&apos;une application web moderne avec authentification, base de données,
						stockage de fichiers et synchronisation en temps réel.
					</p>
					<p className="mt-3 text-sm text-[var(--text-secondary)]">Version demo — en cours de développement.</p>
				</section>
				<section className="rounded-xl border bg-white p-6 shadow-[4px_0_15px_rgba(0,0,0,0.06)]">
					<h2 className="mb-3 text-xl font-bold">Stack Technique</h2>
					<ul className="flex flex-wrap gap-2">
						{stack.map((tech) => (
							<span
								key={tech}
								className="rounded-full border border-[var(--primary-200)] bg-[var(--primary-50)] px-3 py-1 text-sm text-[var(--primary-800)]"
							>
								{tech}
							</span>
						))}
					</ul>
				</section>
				<section className="rounded-xl border bg-white p-6 shadow-[4px_0_15px_rgba(0,0,0,0.06)]">
					<h2 className="mb-3 text-xl font-bold">Vos données</h2>
					<p className="text-[var(--text-secondary)] leading-relaxed">
						Vos notes et images de couverture sont hébergées sur Supabase. Chaque compte accède uniquement à son propre
						contenu. Ce projet n&apos;a pas vocation commerciale et ne revend pas vos données.
					</p>
				</section>
			</div>
			{/* Links */}
			<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<Link href={"/dashboard"} className="rounded border px-4 py-2 bg-[var(--primary-200)] hover:bg-[var(--primary-500)] transition">
					Retour au dashboard
				</Link>
				<a
					href="https://github.com/Adlax/supabase-notes-saas-record"
					target="_blank"
					rel="noopener noreferrer"
					className="rounded border px-4 py-2 hover:bg-[var(--primary-50)] transition"
				>
					Voir sur github
				</a>
			</div>
		</div>
	);
}

export default AboutPage;
