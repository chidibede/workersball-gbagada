import Header from "./Header";
import WorkersBallImage from "./WorkersBallImage";

const RegistrationClosed = () => {
  return (
    <div className="min-h-screen flex flex-col md:items-center bg-gray-50 p-4">
      <div className="lg:w-[50%] xl:w-[40%] md:w-[80%]">
        <Header />
        <WorkersBallImage picture="/workersball2.jpeg" />
        <div className="py-12 font-bold text-2xl md:ml-[35%] ml-24">Registration closed</div>
      </div>
    </div>
  );
};

export default RegistrationClosed;
