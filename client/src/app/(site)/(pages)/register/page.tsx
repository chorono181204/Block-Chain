"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Breadcrumb from "@/components/Common/Breadcrumb";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    walletAddress: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        wallet_address: formData.walletAddress,
        full_name: `${formData.firstName} ${formData.lastName}`
      };

      const { error } = await signUp(formData.email, formData.password, userData);
      if (error) {
        setError(error.message);
      } else {
        router.push("/login?message=Please check your email to verify your account");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb title="Register" pages={["Register"]} />
      
      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-lg shadow-1 p-8">
              <h1 className="text-2xl font-bold text-dark mb-6 text-center">
                Create Your Account
              </h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-light-6 border border-red-light-4 rounded-lg text-red text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-dark mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-dark mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                    placeholder="Phone number (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="walletAddress" className="block text-sm font-medium text-dark mb-2">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    id="walletAddress"
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                    placeholder="0x... (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue text-white py-3 rounded-lg font-medium hover:bg-blue-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-6">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue hover:text-blue-dark font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-3">
                <p className="text-center text-sm text-gray-6">
                  By creating an account, you agree to our{" "}
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

export default RegisterPage; 