export default function Loading() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_44%_50%,rgba(252,132,19,1),rgba(6,43,124,0.91))]" />
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="space-y-6">
            <div className="h-10 w-72 bg-white/40 rounded" />
            <div className="h-64 bg-white/30 rounded-xl" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-12 bg-white/30 rounded" />
              <div className="h-12 bg-white/30 rounded" />
            </div>
            <div className="h-12 bg-white/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
