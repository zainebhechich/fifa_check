export default function Loading() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_44%_50%,rgba(252,132,19,1),rgba(6,43,124,0.91))]" />
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-60 bg-white/40 rounded" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-48 bg-white/30 rounded-xl" />
              <div className="h-48 bg-white/30 rounded-xl" />
            </div>
            <div className="h-6 w-2/3 bg-white/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
