"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Breadcrumb from "@/components/Common/Breadcrumb";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb title="Login" pages={["Login"]} />
      
      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-1 p-8">
              <h1 className="text-2xl font-bold text-dark mb-6 text-center">
                Welcome Back
              </h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-light-6 border border-red-light-4 rounded-lg text-red text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue text-white py-3 rounded-lg font-medium hover:bg-blue-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-6">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue hover:text-blue-dark font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-3">
                <p className="text-center text-sm text-gray-6">
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="text-blue hover:text-blue-dark">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue hover:text-blue-dark">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage; 