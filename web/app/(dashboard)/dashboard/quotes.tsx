const Quotes = ({ quotes }: { quotes: string }) => {
  return (
    <div className="rounded-lg border border-lime-400 bg-[#E5F8A3] p-5 italic">
      &quot;{quotes}&quot;
    </div>
  );
};

export default Quotes;
