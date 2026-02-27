const Footer = () => (
  <footer className="bg-[#e8eaf0] px-8! py-12!  border-t-[rgba(255,255,55,0.65)]">
    <div className="  flex flex-col lg:flex-wrap lg:flex-row lg:items-center m-w-[1100px] mx-auto justify-between  gap-4">
      {/* logo */}
      <div className="font-display font-bold text-[1.5rem]">
        <span className="text-[#334155]">Sure </span>
        <span className="text-gradient">Ride</span>
      </div>
      <p className="text-[#94a3b8] text-[0.85rem]">
        © 2025 Sure Ride Nigeria. All rights reserved.
      </p>
      <p className=" text-[#94a3b8] text-[0.75rem] max-w-65 items-center ">
        Investments involve risk. Commission figures are projections and not
        guaranteed.
      </p>
    </div>
  </footer>
);

export default Footer;
