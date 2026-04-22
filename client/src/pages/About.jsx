import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Target } from 'lucide-react';

const About = () => {
  const problems = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: 'Manual Overtime Tracking',
      description: 'Time-consuming spreadsheets and paper-based systems prone to errors and inconsistencies.'
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: 'Lack of Approval System',
      description: 'No structured process for overtime approval, leading to unauthorized overtime claims.'
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: 'No Transparency',
      description: 'Employees and managers lack visibility into overtime requests and approvals.'
    }
  ];

  const solutions = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Structured Approval Workflow',
      description: 'Automated dual approval system ensuring all overtime requests are properly reviewed.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Clear Tracking',
      description: 'Real-time visibility into overtime requests, approvals, and historical data.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Smart Notifications',
      description: 'Automated alerts keep everyone informed of request status and deadlines.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About TimeFlow
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're revolutionizing how companies manage overtime with our secure, efficient,
              and user-friendly approval system. Built for modern workplaces that value
              transparency, fairness, and productivity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Problem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional overtime management creates inefficiencies and risks for both employees and employers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TimeFlow addresses these challenges with a comprehensive, automated system
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Our mission is to simplify workforce management by providing tools that make
              overtime tracking transparent, approval processes efficient, and compliance effortless.
              We believe in creating technology that serves both employees and employers equally.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;