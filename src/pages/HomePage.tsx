import { read01, read02, read03 } from "../assets/img";

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-3 py-14">
        <div className="mb-11 text-center">
          <span className="text-5xl font-medium md:text-7xl">LITER</span>
          <span className="font-aldo text-chestnut text-6xl md:text-8xl">
            alura
          </span>

          <div className="block text-xl md:text-3xl">Catálogo de libros</div>
        </div>

        <div className="grid max-w-full grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          <img
            className="w-4/5 max-w-[25.5rem] lg:max-w-full"
            src={read01}
            alt="person reading a book"
          />
          <img
            className="hidden w-4/5 max-w-[25.5rem] md:block lg:max-w-full"
            src={read02}
            alt="person reading a book"
          />
          <img
            className="hidden w-4/5 max-w-[25.5rem] lg:block lg:max-w-full"
            src={read03}
            alt="person reading a book"
          />
        </div>
      </div>
    </div>
  );
};
