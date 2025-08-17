import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

const Dashboard = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Codeverse</h1>
        <p className="text-lg md:text-xl mb-6">
          Your one-stop platform to solve problems, attend contests, and prepare for coding interviews.
        </p>
        <Link
          to="/explore"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transform transition">
          <h2 className="text-2xl font-bold mb-4">Solve Problems</h2>
          <p className="mb-4">
            Practice coding problems of various difficulty levels and improve your algorithm skills.
          </p>
          <Link
            to="/problems"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Explore Problems →
          </Link>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transform transition">
          <h2 className="text-2xl font-bold mb-4">Attend Contests</h2>
          <p className="mb-4">
            Participate in live coding contests to test your skills and compete with coders worldwide.
          </p>
          <Link
            to="/contest"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Join Contests →
          </Link>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transform transition">
          <h2 className="text-2xl font-bold mb-4">Prepare for Interviews</h2>
          <p className="mb-4">
            Access curated resources, practice questions, and tips to ace your coding interviews.
          </p>
          <Link
            to="/preparation"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Start Preparing →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center bg-gray-200 dark:bg-gray-800">
        <p>© 2025 Codeverse. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default Dashboard;
