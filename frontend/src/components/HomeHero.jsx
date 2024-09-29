import { assets } from '../assets/assets';

const HomeHero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center">
      <div className="flex-1 flex flex-col justify-center items-center text-center md:text-left md:items-start space-y-4 p-3">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">Welcome to E-Commerce Store</h3>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 max-w-md">
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used
          to demonstrate the visual form of a document or a typeface without relying on meaningful content.
        </p>
      </div>

      <div className="flex-1 flex justify-end items-center">
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-[90%] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default HomeHero;
