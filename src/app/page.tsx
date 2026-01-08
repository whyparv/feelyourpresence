"use client";

import Image from "next/image";
import { SparklesText } from "@/components/ui/sparkles-text";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Mail } from "lucide-react";

// Brand colors for Feel Your Presence
const brandColors = {
  ivory: "#f2ede0",
  deepBlue: "#0b1c2d",
  gold: "#c9a24d",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setMessage(data.message);
        setEmail("");
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus("idle");
        }, 3000);
      } else {
        setSubmitStatus("error");
        setMessage(data.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center font-sans overflow-hidden"
      style={{ backgroundColor: brandColors.ivory }}
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-[#0b1c2d]/5" />

      <main className="relative z-10 flex flex-col items-center justify-center gap-12 px-6 py-16 text-center">
        {/* Logo */}
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <Image
            src="/logo.png"
            alt="Feel Your Presence Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Sparkles heading */}
        <div className="flex flex-col -mt-32 items-center gap-6">
          <SparklesText
            text="Coming Soon"
            colors={{
              first: brandColors.gold,
              second: brandColors.deepBlue,
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
            sparklesCount={15}
          />

          {/* <h2
            className="text-xl md:text-2xl lg:text-3xl font-semibold max-w-2xl"
            style={{ color: brandColors.deepBlue }}
          >
            Feel Your Presence
          </h2> */}

          <p
            className="text-base md:text-lg lg:text-xl max-w-xl leading-relaxed"
            style={{ color: brandColors.deepBlue, opacity: 0.8 }}
          >
            Something extraordinary is on the horizon.
            Stay tuned for an experience that will transform the way you connect with yourself.
          </p>
        </div>

        {/* Call to action */}
        <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-md">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.button
                key="notify-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => setShowForm(true)}
                className="px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2"
                style={{
                  backgroundColor: brandColors.deepBlue,
                }}
              >
                <Mail className="w-5 h-5" />
                Notify Me
              </motion.button>
            ) : (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: "white",
                      color: brandColors.deepBlue,
                      borderWidth: "2px",
                      borderColor: brandColors.gold,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: brandColors.deepBlue,
                      minWidth: "120px",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {submitStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 justify-center p-4 rounded-full"
                      style={{
                        backgroundColor:
                          submitStatus === "success"
                            ? `${brandColors.gold}20`
                            : "#ff000020",
                        color:
                          submitStatus === "success"
                            ? brandColors.deepBlue
                            : "#cc0000",
                      }}
                    >
                      {submitStatus === "success" && (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                      <span className="font-medium">{message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Decorative elements */}
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: brandColors.gold }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: brandColors.deepBlue }}
      />
    </div>
  );
}
