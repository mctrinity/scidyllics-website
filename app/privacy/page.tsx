import Footer from "../../components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 container mx-auto max-w-2xl py-16 px-4">
  <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-lg p-8 mt-8 mb-8 md:mb-12">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how Scidyllics collects, uses, and protects your information when you use our website and services.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal information you provide (such as name, email, company, and message via contact forms)</li>
            <li>Usage data (such as pages visited, browser type, and device information)</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Information</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>To respond to your inquiries and provide services</li>
            <li>To improve our website and offerings</li>
            <li>To communicate important updates</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8 mb-2">Data Protection</h2>
          <p className="mb-4">We implement reasonable security measures to protect your data. We do not sell or share your information with third parties except as required by law.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
          <p>If you have questions about this policy, please contact us at <a href="mailto:mdizon@scidyllics.com" className="underline">mdizon@scidyllics.com</a>.</p>
        </div>
      </main>
    </div>
  );
}
