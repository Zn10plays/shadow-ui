import Form from "next/form";

interface LoginCardProps {
    action: (data: FormData) => void | Promise<void>
}

const LoginFormCard = ({action}: LoginCardProps) => {
  return (
    // Card Container
    <div className="bg-gray-900 text-white w-full max-w-lg p-8 rounded-xl shadow-lg">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-400 mt-2">Sign in to continue to your account</p>
      </div>

      {/* Form */}
      <Form action={action} className="space-y-6" autoComplete="off">
        
        {/* Email Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="username"
            id="username"
            name="username"
            required
            placeholder="pandaman"
            className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="••••••••"
            className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </div>
      </Form>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginFormCard