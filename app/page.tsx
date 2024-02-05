// app/page.tsx
import Link from 'next/link';


const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    {/* Heading and Subtitle */}
    <div className="text-center mb-8">
      <h1 className="text-3xl text-pink-500 font-bold">All at One Place</h1>
      <h4 className="text-gray-500 text-lg">Finding your needs just in 10 seconds</h4>
    </div>

    {/* Chatbot Picture */}
    <div className="mb-8">
    <iframe src="https://lottie.host/embed/4ccfa6ac-a8e1-475f-bb25-f2975390a2fb/a0zvmQ0WCC.json"></iframe>
      <img src="/path/to/chatbot-image.png" alt="Chatbot" className="w-32 h-32 rounded-full" />
    </div>

    {/* Get Started Button */}
    <Link href="/mainpage" passHref>
      <div className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300">
        Get Started
      </div>
    </Link>

   
  </div>
);

export default Home;
