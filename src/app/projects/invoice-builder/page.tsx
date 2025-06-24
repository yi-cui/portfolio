"use client"

import React from 'react'
import { ArrowLeft, ArrowUpRight, Calendar, Users, Target } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function InvoiceBuilderProject() {
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
            <Image 
              src="/dubsado-logo.png" 
              alt="Dubsado Logo" 
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-gray-400 text-sm font-medium">DUBSADO</span>
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight mb-16">
            Invoice Builder Redesign
          </h1>

          {/* Hero Image */}
          <div className="mb-20">
            <div className="rounded-lg overflow-hidden bg-gray-900/50">
              <Image 
                src="/invoice-builder.png" 
                alt="Invoice Builder Redesign Hero Image" 
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
            {/* Key Stats */}
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">$100M</div>
              <div className="text-gray-400 text-xs md:text-sm">Monthly transactions processed</div>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.6/5</div>
              <div className="text-gray-400 text-xs md:text-sm">User satisfaction rating</div>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">40%</div>
              <div className="text-gray-400 text-xs md:text-sm">Efficiency improvement</div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 w-20 flex-shrink-0">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">ROLE</span>
              </div>
              <div className="text-white">Lead Product Designer</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 w-20 flex-shrink-0">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">TEAM</span>
              </div>
              <div className="text-white">1 Product Designer, 1 PM, 3 Engineers</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 w-20 flex-shrink-0">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">TIMELINE</span>
              </div>
              <div className="text-white">2 months</div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="max-w-4xl">
            <h3 className="text-lg font-bold mb-4 text-gray-300">PROJECT OVERVIEW</h3>
            <p className="text-xl leading-relaxed text-gray-300 mb-6">
              Dubsado is a CRM platform that empowers small businesses with streamlined workflows and efficient payment processes, handling over <span className="text-white font-semibold">$100 million</span> in transactions monthly across <span className="text-white font-semibold">50,000+ active users</span>.
            </p>
            <p className="text-xl leading-relaxed text-gray-300">
              To increase revenue, we planned to launch our own payment processor. However, user complaints about the existing invoice builder&apos;s inefficiency posed a potential obstacle to adoption. I led the complete redesign to streamline the invoice creation process and maximize the revenue potential of Dubsado&apos;s new payment solution.
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
            
            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              The B2B invoice management market is valued at <span className="text-white font-semibold">$3.8 billion</span> and growing at <span className="text-white font-semibold">12.4% CAGR</span>. Small businesses process millions of invoices annually, yet most struggle with inefficient, time-consuming creation processes.
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  Critical Business Challenge
                </h3>
                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  User complaints about invoice builder inefficiency could <span className="text-white font-semibold">hinder payment processor adoption</span>, directly impacting our <span className="text-white font-semibold">$100K+ monthly revenue potential</span>.
                </p>
                
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                  <h4 className="font-bold text-white mb-4">Two Major Pain Points:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 font-bold text-lg flex-shrink-0">1.</span>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Workflow Inefficiency</h5>
                        <p className="text-gray-300">Users reported spending <span className="text-white font-semibold">15-20 minutes per invoice</span> due to poor information hierarchy and tedious interactions.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 font-bold text-lg flex-shrink-0">2.</span>
                      <div>
                        <h5 className="font-semibold text-white mb-2">User Experience Friction</h5>
                        <p className="text-gray-300">High error rates from misclicks and confusing interface elements created frustration and reduced platform adoption.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4 text-gray-300">Existing Solutions</h4>
                <p className="text-gray-300 mb-4">
                  Current solutions like QuickBooks and FreshBooks focus on accounting features but lack streamlined invoice creation workflows for creative small businesses.
                </p>
              </div>
            </div>

            {/* Challenge Image */}
            <div className="mb-8">
              <Image 
                src="/invoice-challenge.png" 
                alt="Invoice Builder Challenge Overview" 
                width={1200}
                height={800}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
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
                  <h4 className="font-bold text-white mb-4">Small business owners in creative industries</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Solo entrepreneurs and small teams (1-3 people) in creative fields including photographers, designers, consultants, and freelancers who need efficient invoice management.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Research Method</h3>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                  <h4 className="font-bold text-white mb-4">User survey & Usability testing</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Conducted comprehensive survey with 367 responses and usability testing with 42 participants to identify pain points and validate solutions.
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
                    <span className="text-gray-300">Low discoverability of features and information</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Information hierarchy doesn&apos;t follow users&apos; workflow</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Tedious item table interactions slow down process</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Post-send experience lacks clear guidance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Users frequently misclick remove button</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">Edit and view modes create visual confusion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Section - Phase 1 */}
        <div className="mb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-blue-500">🔧</span>
              Phase 1 Information Architecture Redesign
            </h2>
            
            <p className="text-lg leading-relaxed text-gray-300 mb-12">
              Restructured the entire information hierarchy to align with users&apos; natural workflow, moving related tasks together and creating intuitive navigation paths that reduce cognitive load and improve task completion rates.
            </p>
            
            {/* Before/After Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <div className="rounded-lg overflow-hidden bg-gray-900/50">
                <Image 
                  src="/invoice-before.png" 
                  alt="Invoice Builder - Before Redesign" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">Before: Scattered Information</h4>
                  <p className="text-gray-400 text-sm">Users had to scroll extensively to find features</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden bg-gray-900/50">
                <Image 
                  src="/invoice-after.png" 
                  alt="Invoice Builder - After Redesign" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">After: Logical Grouping</h4>
                  <p className="text-gray-400 text-sm">Related tasks grouped for efficient workflow</p>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 text-white">Key Improvements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-lg flex-shrink-0">•</span>
                    <span className="text-gray-300">Grouped related invoice actions in logical sections</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-lg flex-shrink-0">•</span>
                    <span className="text-gray-300">Elevated transaction information visibility post-send</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-lg flex-shrink-0">•</span>
                    <span className="text-gray-300">Reduced scrolling distance by 60%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-lg flex-shrink-0">•</span>
                    <span className="text-gray-300">Created clear visual hierarchy for task prioritization</span>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Solution Section - Phase 2 */}
        <div className="mb-20">
          <div className="border-t border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-purple-500">⚡</span>
              Phase 2 Interactive Table Redesign
            </h2>
            
            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              Explored <span className="text-white font-semibold">three design approaches</span> to solve the tedious item table interaction problem:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h4 className="font-bold text-white mb-3">Option 1: Inline Edit</h4>
                <p className="text-gray-300 text-sm mb-4">View and edit simultaneously, intuitive and natural approach.</p>
                <div className="text-xs text-red-400">❌ Hard to organize complex information</div>
              </div>
              
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h4 className="font-bold text-white mb-3">Option 2: Modal Edit</h4>
                <p className="text-gray-300 text-sm mb-4">Dedicated modal space for editing complex information.</p>
                <div className="text-xs text-red-400">❌ Sacrifices context for comparison</div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-6">
                <h4 className="font-bold text-white mb-3">Option 3: Click to Edit ✅</h4>
                <p className="text-gray-300 text-sm mb-4">Click opens expanded editing mode with more space.</p>
                <div className="text-xs text-purple-400">✅ Selected solution</div>
              </div>
            </div>

            {/* Table Interaction Demo */}
            <div className="mb-8">
              <Image 
                src="/invoice-table-interaction.png" 
                alt="Invoice Table Interaction Design" 
                width={1200}
                height={800}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-4">Design Rationale</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold flex-shrink-0">•</span>
                    <span>Separated remove and edit actions to prevent misclicks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold flex-shrink-0">•</span>
                    <span>Made view and edit modes visually consistent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold flex-shrink-0">•</span>
                    <span>Utilized table space more effectively for complex data</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Validation Results</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold flex-shrink-0">•</span>
                    <span>42 participants in usability testing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold flex-shrink-0">•</span>
                    <span>4.6/5 rating for new line item interaction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold flex-shrink-0">•</span>
                    <span>85% reduction in misclick errors</span>
                  </li>
                </ul>
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
              The redesigned invoice builder launched in Q2 2024, successfully supporting Dubsado&apos;s payment processor rollout. The improvements led to <span className="text-white font-semibold">40% faster invoice creation</span>, <span className="text-white font-semibold">85% reduction in user errors</span>, and positioned the platform for <span className="text-white font-semibold">$100K+ monthly revenue growth</span> from payment processing fees.
            </p>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.6/5</div>
                <div className="text-gray-400 text-sm">User Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">40%</div>
                <div className="text-gray-400 text-sm">Faster Creation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">85%</div>
                <div className="text-gray-400 text-sm">Error Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$100K+</div>
                <div className="text-gray-400 text-sm">Revenue Potential</div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              Post-launch metrics showed significant improvements in user engagement and task completion rates. The streamlined workflow reduced average invoice creation time from <span className="text-white font-semibold">15-20 minutes to 8-10 minutes</span>, while user satisfaction scores increased from 3.2/5 to 4.6/5.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              Most importantly, the improved invoice builder successfully supported the launch of Dubsado&apos;s payment processor, with <span className="text-white font-semibold">78% of users adopting the new payment solution</span> within the first quarter, directly contributing to the company&apos;s revenue diversification strategy.
            </p>
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