export default function FloatingCTA() {
  return (
    <a
      href="#booking"
      className="fixed bottom-6 left-6 z-[200] flex items-center bg-rose text-white px-4 py-2.5 rounded-full shadow-lg font-bold text-xs whitespace-nowrap"
    >
      <span className="absolute inset-0 rounded-full bg-rose animate-ping opacity-30" />
      <span className="relative">احجز الآن</span>
    </a>
  );
}