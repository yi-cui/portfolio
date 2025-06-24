"use client"

import React from 'react'
import { ArrowLeft, ArrowUpRight, Calendar, Users, Target } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ServiceCapitalProject() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 lg:py-16">
        
        {/* Back Navigation */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-16">
          {/* Company Logo/Name */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded">
              <img 
                src="/sorcara-logo.png" 
                alt="Sorcara Logo" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
            </div>
            <span className="text-gray-400 text-sm font-medium">SORCARA</span>
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight mb-16">
            Sorcara Copilot
          </h1>

          {/* Hero Image */}
          <div className="mb-20">
            <div className="rounded-lg overflow-hidden bg-gray-900/50">
              <img 
                src="/copilot-overview.png" 
                alt="Sorcara Copilot Hero Image" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
            {/* Key Stats */}
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-gray-400 text-xs md:text-sm">Businesses onboarded</div>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">85%</div>
              <div className="text-gray-400 text-xs md:text-sm">User task completion rate</div>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">75%</div>
              <div className="text-gray-400 text-xs md:text-sm">Faster time-to-market</div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 w-20 flex-shrink-0">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">ROLE</span>
              </div>
              <div className="text-white">UX/UI Designer - User Research, Information Architecture, Interaction Design, Visual Design</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 w-20 flex-shrink-0">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">TEAM</span>
              </div>
              <div className="text-white">1 UX Designer (Me), 1 Product Manager, 8 Engineers</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 w-20 flex-shrink-0">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">TIMELINE</span>
              </div>
              <div className="text-white">07 / 2024 - </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="max-w-6xl">
            <h3 className="text-lg font-bold mb-4 text-gray-300">PROJECT OVERVIEW</h3>
            <p className="text-xl leading-relaxed text-gray-300 mb-0">
              Sorcara Copilot is an AI-powered soucing agent that empowers retailers and wholesalers to navigate the complexity of strategic and custom product sourcing.
            </p>
            <p className="text-xl leading-relaxed text-gray-300">
              I led the end-to-end design process to create an intuitive AI copilot experience that simplifies complex business processes, making intelligent automation accessible to businesses while providing clear, actionable insights.
            </p>
          </div>
        </div>



        {/* Challenge Section */}
        <div className="mb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-red-500">📍</span>
              Problem
            </h2>
            
            <p className="text-xl leading-relaxed text-gray-300 mb-8">
              The B2B global sourcing market is booming, valued at approximately $18.6 trillion in 2023 and projected to grow at a CAGR of around 18.2% through 2030. However, this lucrative market presents significant challenges for retailers and wholesalers, including:
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">• Overwhelming Strategic Decision Complexities:</h3>
                <p className="text-gray-300 text-lg leading-relaxed ml-6">
                  The sourcing journey requires businesses to navigate a complex landscape of decisions, from analyzing customer trends and designing specifications to verifying suppliers, negotiating terms, managing logistics, and adapting to fluctuating markets.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-white">• Supplier Network Constraints:</h3>
                <p className="text-gray-300 text-lg leading-relaxed ml-6">
                  Limited supplier networks further challenge businesses by hindering their ability to find suitable partners, resulting in inflated costs, production delays, and slower time-to-market.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-red-500">📍</span>
                Existing Solutions
              </h2>
              
              <p className="text-xl leading-relaxed text-gray-300">
                Traditional sourcing methods rely on <span className="bg-gray-800 px-2 py-1 rounded text-white font-semibold">outdated catalogs</span>, demanding extensive manual research, or <span className="bg-gray-800 px-2 py-1 rounded text-white font-semibold">human assistants</span> limited by their under-digitalized networks and knowledge, leading to a loss of control over supplier relationships and potential hidden commissions.
              </p>
            </div>
          </div>
        </div>

        {/* Challenge Image */}
        <div className="mb-20">
          <div className="rounded-lg overflow-hidden bg-gray-900/50">
            <img 
              src="/challenge-overview.png" 
              alt="Sourcing Challenges Overview" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Research Section */}
        <div className="mb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8">RESEARCH & DISCOVERY</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-6">Target Users</h3>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                  <h4 className="font-bold text-white mb-4">Retailers & Wholesalers</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Small to medium businesses seeking efficient product sourcing solutions, ranging from dropshippers to established retailers across apparel, electronics, and consumer goods industries.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Research Method</h3>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                  <h4 className="font-bold text-white mb-4">User interviews & Competitive analysis</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Conducted 25+ user interviews with retailers and wholesalers, analyzed existing sourcing platforms (Alibaba, Global Sources), and studied B2B procurement workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-8">Key Findings</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Manual sourcing takes 2-4 weeks per product category</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Language barriers create miscommunication with suppliers</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Lack of real-time market pricing and trend data</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Difficulty translating business needs to technical specs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Overwhelming supplier options without quality validation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Complex compliance requirements across regions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-blue-500">🤖</span>
              Phase 1 Smart RFQ (request for quotation) Agent
            </h2>
            
            <p className="text-lg leading-relaxed text-gray-300 mb-12">
              Our Smart RFQ Agent translates <span className="text-white font-semibold">everyday language</span> into <span className="text-white font-semibold">industry-specific terminology</span>. When users input vague descriptions like "cat scratcher," our <span className="text-white font-semibold">AI system</span> automatically generates precise specifications—<span className="text-white font-semibold">surface materials, dimensions, compliance requirements</span>—reducing sourcing time from <span className="text-white font-semibold">weeks to days</span>.
            </p>
            
            {/* RFQ Interface Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <div className="rounded-lg overflow-hidden bg-gray-900/50">
                <img 
                  src="/rfq-step1.png" 
                  alt="RFQ Step 1 - Basic Information" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden bg-gray-900/50">
                <img 
                  src="/rfq-step2.png" 
                  alt="RFQ Step 2 - Product Specification" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                Limitation
              </h3>
              <p className="text-lg leading-relaxed text-gray-300">
                We did several user interviews and discovered that when making purchase decisions, users still struggle with <span className="text-white font-semibold">not being able to see actual products</span> and must rely on submitting requirements and waiting for supplier responses. This <span className="text-white font-semibold">lack of visual context</span> creates uncertainty and delays in decision-making.
              </p>
            </div>
        </div>

        {/* Phase 2 Section */}
        <div className="mb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-purple-500">🔍</span>
              Phase 2 Sourcing Assistant
            </h2>
            
            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              The agent is built on <span className="text-white font-semibold">six core components</span>:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <span className="text-purple-500 font-bold text-lg flex-shrink-0">1.</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Product & Supplier Database:</h3>
                  <p className="text-gray-300">Accesses a massive network of over <span className="text-white font-semibold">500M+ products</span>, <span className="text-white font-semibold">45K suppliers</span>, and <span className="text-white font-semibold">60+ logistics partners</span>.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-purple-500 font-bold text-lg flex-shrink-0">2.</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Real-Time Market Database:</h3>
                  <p className="text-gray-300">Utilizes <span className="text-white font-semibold">dynamic data</span> on sales, trends, and more to stay ahead of market shifts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-purple-500 font-bold text-lg flex-shrink-0">3.</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Sourcing Knowledge Graph:</h3>
                  <p className="text-gray-300">Leverages a <span className="text-white font-semibold">proprietary knowledge graph</span> to understand the relationships between product specifications, categories, consumer trends, and compliance requirements.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-purple-500 font-bold text-lg flex-shrink-0">4.</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Query Analysis:</h3>
                  <p className="text-gray-300">Accurately interprets <span className="text-white font-semibold">natural language input</span> to understand user needs and diversify workflow.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-purple-500 font-bold text-lg flex-shrink-0">5.</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Workflow Planning:</h3>
                  <p className="text-gray-300">Breaks down <span className="text-white font-semibold">complex sourcing goals</span> into smaller, manageable tasks.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-purple-500 font-bold text-lg flex-shrink-0">6.</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Dynamic Response Delivery:</h3>
                  <p className="text-gray-300">Constructs <span className="text-white font-semibold">tailored responses</span> by leveraging a library of modular templates to address specific user needs and queries.</p>
                </div>
              </div>
            </div>

            {/* Phase 2 Architecture Image */}
            <div className="mb-8">
              <img 
                src="/corefeature.png" 
                alt="Sorcara Copilot Architecture Overview" 
                className="w-full rounded-lg shadow-lg"
                onError={(e) => {
                  console.error('Failed to load image:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Key Use Cases */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
                <span>🔑</span>
                Key Use Cases
              </h3>
              
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                The agent allows retailers and wholesalers to freely discuss their sourcing needs—whether their language is <span className="text-white font-semibold">vague or precise</span>, <span className="text-white font-semibold">professional or naive</span>—with a system that understands, processes, and infers user intentions, intelligently directing tasks to the appropriate workflow.
              </p>

              <p className="text-lg text-gray-300 mb-6">
                <span className="text-white font-semibold">Key use cases include:</span>
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-lg flex-shrink-0">1.</span>
                  <p className="text-gray-300">Find <span className="text-white font-semibold">white label products</span></p>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-lg flex-shrink-0">2.</span>
                  <p className="text-gray-300">Find <span className="text-white font-semibold">suppliers</span> for <span className="text-white font-semibold">highly customizable products</span></p>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-lg flex-shrink-0">3.</span>
                  <p className="text-gray-300">Generate <span className="text-white font-semibold">RFQ & Tech Packs</span></p>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-lg flex-shrink-0">4.</span>
                  <p className="text-gray-300">Access <span className="text-white font-semibold">sourcing research</span> and <span className="text-white font-semibold">consultation</span></p>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-lg flex-shrink-0">5.</span>
                  <p className="text-gray-300">Compare <span className="text-white font-semibold">quotes</span>, Negotiate <span className="text-white font-semibold">Terms</span></p>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-lg flex-shrink-0">6.</span>
                  <p className="text-gray-300">Connect with <span className="text-white font-semibold">fulfillment options</span> and <span className="text-white font-semibold">status</span></p>
                </div>
              </div>

              {/* Use Cases Image */}
              <div className="mb-12">
                <img 
                  src="/use-cases.png" 
                  alt="Sorcara Copilot Key Use Cases" 
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    console.error('Failed to load image:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Example 3.1 */}
              <div className="mb-12">
                <h4 className="text-lg font-bold mb-4 text-white">01 Find White Label Products</h4>
                <div className="border-l-4 border-gray-600 pl-4 mb-6">
                  <p className="text-gray-400 italic">
                    <span className="font-semibold">Buyer Queries Example:</span> "A pet tracker for <span className="text-white font-semibold">small dogs (2kg - 5kg)</span>"
                  </p>
                </div>
                <div className="mb-6">
                  <img 
                    src="/white-label.png" 
                    alt="White Label Products Example" 
                    className="w-full rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error('Failed to load image:', e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Example 3.2 */}
              <div className="mb-12">
                <h4 className="text-lg font-bold mb-4 text-white">02 Find Suppliers for Highly Customizable Products</h4>
                <div className="border-l-4 border-gray-600 pl-4 mb-6">
                  <p className="text-gray-400 italic">
                    <span className="font-semibold">Buyer Queries Example:</span> "I want to start a print-on-demand business for custom pet hoodies. I need a supplier who can print custom designs on hoodies for dogs of various sizes. I'm looking for high-quality, soft materials that are comfortable for pets."
                  </p>
                </div>
                <div className="mb-6">
                  <img 
                    src="/customizable-products.png" 
                    alt="Customizable Products Example" 
                    className="w-full rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error('Failed to load image:', e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Example 3.3 */}
              <div className="mb-12">
                <h4 className="text-lg font-bold mb-4 text-white">03 Sourcing Research & Consultation</h4>
                <div className="border-l-4 border-gray-600 pl-4 mb-6">
                  <p className="text-gray-400 italic mb-3">
                    <span className="font-semibold">Buyer Queries Example:</span>
                  </p>
                  <ul className="text-gray-400 italic space-y-2 ml-4">
                    <li>• "What are the regulations for using the term 'organic' on pet food labels in the US?"</li>
                    <li>• "Help me research the most trendy features to source pet food"</li>
                    <li>• "What is your recommendation on specifications for best selling pet clothes in winter?"</li>
                  </ul>
                </div>
                <div className="mb-6">
                  <img 
                    src="/research-consultation.png" 
                    alt="Research & Consultation Example" 
                    className="w-full rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error('Failed to load image:', e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-orange-500">🔥</span>
              Achievements
            </h2>
            
            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              In November 2024, Sorcara MVP was launched, empowering <span className="text-white font-semibold">50+ retail brands and dropshippers across 6 industries</span>, ranging from apparel to consumer electronics. Customers reported a staggering <span className="text-white font-semibold">35% reduction in sourcing costs</span> compared to their previous reliance on Alibaba or human-operated sourcing companies, coupled with a remarkable <span className="text-white font-semibold">75% faster time to market</span>. This improvement translated to <span className="text-white font-semibold">thousands - millions</span> in increased profit, demonstrating the undeniable impact of AI-powered sourcing.
            </p>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400 text-sm">Retail Brands</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">-35%</div>
                <div className="text-gray-400 text-sm">Sourcing Cost</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">+75%</div>
                <div className="text-gray-400 text-sm">Faster Time-to-Market</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">+25%</div>
                <div className="text-gray-400 text-sm">Human Evaluation on Sorcara agent</div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              To further validate Sorcara MVP's capabilities, we conducted a 2-hour evaluation session with 15 customers, comparing our agent to competitors like <span className="text-green-400 font-semibold">Accio (Alibaba's buyer agent)</span> and <span className="text-green-400 font-semibold">Shopping with Perplexity AI</span>. This evaluation encompassed a wide range of tasks, including: query understanding, product and supplier discovery, research and analysis, and document / negotiation generation.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              Across all these tasks, Sorcara MVP achieved an average total score of <span className="text-white font-semibold">7.6/10—a 25% improvement over competitors</span>—and maintaining a less than <span className="text-white font-semibold">10% bad case rate</span>, based on customer evaluations.
            </p>
          </div>
        </div>

        {/* Legacy Solution Section - Keep for now */}
        <div className="mb-20" style={{ display: 'none' }}>
            
            <div className="space-y-12">
              {/* Solution 1 */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">1. Streamlined Application Flow</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Designed a step-by-step application process that breaks down complex financial information into digestible sections, with smart defaults and contextual help.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-white">Problem</h4>
                    <p className="text-gray-400 text-sm">Traditional applications were overwhelming with 20+ pages of complex financial forms.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-white">Solution</h4>
                    <p className="text-gray-400 text-sm">Created a 5-step guided process with progressive disclosure and smart form validation.</p>
                  </div>
                </div>
              </div>

              {/* Solution 2 */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">2. Investor Dashboard & Analytics</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Built comprehensive analytics and risk assessment tools that help investors make informed decisions with clear visualizations of service business metrics.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-white">Key Features</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li>• Real-time performance tracking</li>
                      <li>• Risk assessment scoring</li>
                      <li>• Service-specific metrics visualization</li>
                      <li>• Portfolio management tools</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-white">Impact</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li>• 40% faster investment decisions</li>
                      <li>• 85% user satisfaction rate</li>
                      <li>• 60% increase in platform engagement</li>
                      <li>• 25% improvement in matching accuracy</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Solution 3 */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">3. Communication & Collaboration Hub</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Integrated messaging and document sharing system that facilitates transparent communication between service providers and investors throughout the funding process.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-white">Features</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li>• Secure document sharing</li>
                      <li>• Real-time messaging</li>
                      <li>• Progress milestone tracking</li>
                      <li>• Automated status updates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-white">Results</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li>• 50% reduction in email exchanges</li>
                      <li>• 3.2x faster application processing</li>
                      <li>• 95% document completion rate</li>
                      <li>• Improved user trust and transparency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Navigation */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Next Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
} 