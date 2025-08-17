import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ProblemList from '../components/ProblemList/ProblemList';
import ContestPage from '../components/Contest/Contest';
import ExplorePage from '../components/Explore/ExplorePage';
import Dashboard from '../pages/Dashboard';
import AddProblemPage from '../components/AddProblem/AddProblemPage';
import ProblemPage from '../components/ProblemPage/ProblemPage';

const AppRoutes = () => {
return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/problems" element={<ProblemList />} />
      <Route path="/problems/:problemId" element={<ProblemPage />} />
      <Route path='/contest'  element={<ContestPage/>}/>
      <Route path='/explore'  element={<ExplorePage/>}/>
      <Route path='/addProblems'  element={<AddProblemPage/>}/>
    </Routes>
    );
};

export default AppRoutes;
