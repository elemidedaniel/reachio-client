import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const ACCENT = '#0F0F0F';
const GRAY   = '#6B7280';
const BORDER = '#E5E7EB';
const BG     = '#FFFFFF';
const SOFT   = '#F9FAFB';

/* ── simple fade-up on scroll ── */
function FadeUp({ children, delay = 0 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '60px',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${BORDER}`,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
    }}>
      <span style={{
        fontSize: '17px', fontWeight: '700',
        color: ACCENT, letterSpacing: '-0.4px',
        fontFamily: 'system-ui, sans-serif',
      }}>
        Reachio
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/login" style={{
          fontSize: '13.5px', fontWeight: '500',
          color: GRAY, textDecoration: 'none',
          padding: '8px 16px', borderRadius: '8px',
          transition: 'all 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = SOFT; }}
          onMouseLeave={e => { e.currentTarget.style.color = GRAY; e.currentTarget.style.background = 'transparent'; }}
        >
          Log in
        </Link>
        <Link to="/signup" style={{
          fontSize: '13.5px', fontWeight: '500',
          color: '#fff', background: ACCENT,
          textDecoration: 'none',
          padding: '8px 18px', borderRadius: '8px',
          transition: 'opacity 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Get Started Free
        </Link>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section style={{
      paddingTop: '140px', paddingBottom: '80px',
      textAlign: 'center', background: BG,
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '24px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '12.5px', fontWeight: '500',
            color: '#374151',
            background: SOFT, border: `1px solid ${BORDER}`,
            padding: '5px 14px', borderRadius: '40px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            Free to use — no credit card required
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: '700',
            color: ACCENT,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 24px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Cold outreach,<br />on autopilot.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontSize: '17px', color: GRAY,
            lineHeight: 1.7, margin: '0 0 36px',
            fontWeight: '400',
          }}
        >
          Add companies, write personalised email templates, and let Reachio
          send up to 10 emails a day — automatically, with your name and voice,
          from your own Gmail.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/signup" style={{
            fontSize: '14px', fontWeight: '600',
            color: '#fff', background: ACCENT,
            textDecoration: 'none',
            padding: '12px 28px', borderRadius: '9px',
            transition: 'opacity 0.15s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Start for free →
          </Link>
          <Link to="/login" style={{
            fontSize: '14px', fontWeight: '500',
            color: '#374151', background: BG,
            textDecoration: 'none',
            padding: '12px 28px', borderRadius: '9px',
            border: `1px solid ${BORDER}`,
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = SOFT; e.currentTarget.style.borderColor = '#D1D5DB'; }}
            onMouseLeave={e => { e.currentTarget.style.background = BG; e.currentTarget.style.borderColor = BORDER; }}
          >
            Sign in
          </Link>
        </motion.div>
      </div>

      {/* App screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '1100px', margin: '64px auto 0',
          padding: '0 24px',
        }}
      >
        <div style={{
          borderRadius: '16px', overflow: 'hidden',
          border: `1px solid ${BORDER}`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)',
          background: SOFT,
        }}>
          {/* Fake browser chrome */}
          <div style={{
            background: '#F3F4F6', padding: '12px 16px',
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, maxWidth: '320px', margin: '0 auto',
              background: '#fff', borderRadius: '6px',
              padding: '4px 12px',
              fontSize: '11.5px', color: '#9CA3AF',
              border: `1px solid ${BORDER}`,
              textAlign: 'center',
            }}>
              app.reachio.io/dashboard
            </div>
          </div>

          {/* Dashboard mockup */}
          <div style={{ background: '#F9FAFB', padding: '0', display: 'flex', minHeight: '480px' }}>

            {/* Sidebar */}
            <div style={{
              width: '200px', background: '#fff',
              borderRight: `1px solid ${BORDER}`,
              padding: '20px 14px',
              display: 'flex', flexDirection: 'column', gap: '4px',
              flexShrink: 0,
            }}>
              <div style={{ padding: '4px 10px 16px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: ACCENT }}>Reachio</span>
              </div>
              {[
                { label: 'Dashboard', active: true },
                { label: 'Companies', active: false },
                { label: 'Templates', active: false },
                { label: 'Email Log', active: false },
                { label: 'Notifications', active: false },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '8px 10px', borderRadius: '7px', fontSize: '12px',
                  fontWeight: item.active ? '500' : '400',
                  color: item.active ? ACCENT : '#9CA3AF',
                  background: item.active ? '#F3F4F6' : 'transparent',
                }}>
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: '24px', overflow: 'hidden' }}>

              {/* Header */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: ACCENT, marginBottom: '4px' }}>
                  Good morning, Daniel
                </div>
                <div style={{ fontSize: '12px', color: GRAY }}>Here's your outreach overview</div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {[
                  { label: 'Total Companies', val: '48' },
                  { label: 'Emails Sent',     val: '32' },
                  { label: 'Opened',          val: '18' },
                  { label: 'Replied',         val: '6'  },
                ].map(s => (
                  <div key={s.label} style={{
                    background: '#fff', borderRadius: '8px',
                    border: `1px solid ${BORDER}`, padding: '12px 14px',
                  }}>
                    <div style={{ fontSize: '10px', color: GRAY, marginBottom: '6px' }}>{s.label}</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: ACCENT }}>{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Scheduler status */}
              <div style={{
                background: '#F0FDF4', border: '1px solid #BBF7D0',
                borderRadius: '8px', padding: '10px 14px',
                fontSize: '12px', color: '#166534',
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '16px',
              }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
                Scheduler active — sends at 09:00 UTC daily
              </div>

              {/* Recent emails table */}
              <div style={{
                background: '#fff', borderRadius: '8px',
                border: `1px solid ${BORDER}`, overflow: 'hidden',
              }}>
                <div style={{
                  padding: '12px 16px', borderBottom: `1px solid #F3F4F6`,
                  fontSize: '12px', fontWeight: '600', color: ACCENT,
                }}>
                  Recent Emails
                </div>
                {[
                  { co: 'Paystack', name: 'John Doe', status: 'Replied', color: '#D1FAE5', text: '#065F46' },
                  { co: 'Flutterwave', name: 'Sarah M.', status: 'Opened', color: '#DBEAFE', text: '#1E40AF' },
                  { co: 'Andela',     name: 'Mike T.',  status: 'Sent',   color: '#FEF9C3', text: '#854D0E' },
                ].map((row, i) => (
                  <div key={i} style={{
                    padding: '10px 16px', borderBottom: i < 2 ? `1px solid #F9FAFB` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '500', color: ACCENT }}>{row.co}</div>
                      <div style={{ fontSize: '11px', color: GRAY }}>{row.name}</div>
                    </div>
                    <span style={{
                      fontSize: '10.5px', fontWeight: '500',
                      padding: '3px 9px', borderRadius: '20px',
                      background: row.color, color: row.text,
                    }}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── FEATURES ── */
const FEATURES = [
  { icon: '✉', title: 'Personalised emails',       desc: 'Use variables like {{company_name}}, {{your_role}}, and {{project_title}} to make every email feel handwritten.' },
  { icon: '⏰', title: 'Scheduled sending',          desc: 'Set a time, set a limit. Reachio sends up to 10 emails per day, automatically, at your chosen time.' },
  { icon: '📁', title: 'Company management',         desc: 'Add companies manually or import from CSV. Duplicate detection and blacklisting built in.' },
  { icon: '📄', title: 'CV attachment',              desc: 'Attach different CVs per template. Reachio picks the right one — or falls back to your default.' },
  { icon: '🔔', title: 'Smart notifications',        desc: 'Get notified when emails are sent, opened, or replied to. Know when your list runs out.' },
  { icon: '↩', title: 'Follow-up automation',       desc: 'One automatic follow-up per company after X days with no reply. Never miss a warm lead.' },
];

function Features() {
  return (
    <section style={{ background: SOFT, padding: '100px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '12.5px', fontWeight: '600', color: '#6B7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Features
            </p>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700',
              color: ACCENT, letterSpacing: '-0.03em', margin: 0,
              fontFamily: 'system-ui, sans-serif',
            }}>
              Everything you need.<br />Nothing you don't.
            </h2>
          </div>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.06}>
              <div style={{
                background: '#fff', borderRadius: '12px',
                border: `1px solid ${BORDER}`, padding: '24px',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: SOFT, border: `1px solid ${BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', marginBottom: '16px',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '14.5px', fontWeight: '600', color: ACCENT, margin: '0 0 8px' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: GRAY, lineHeight: 1.65, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ── */
const STEPS = [
  { num: '01', title: 'Set up your profile',    desc: 'Add your name, role, skills, bio, and CV. Connect your Gmail with an app password. Takes 3 minutes.' },
  { num: '02', title: 'Add companies',          desc: 'Add companies manually or import a CSV. Include the contact name, email, industry, and any notes.' },
  { num: '03', title: 'Write your templates',   desc: 'Create up to 3 email templates with personalisation variables. Add a follow-up template for no-replies.' },
  { num: '04', title: 'Set your schedule',      desc: 'Choose what time to send, how many per day, and how long to wait between each email.' },
  { num: '05', title: 'Let Reachio run',        desc: 'Enable the scheduler. Reachio picks the right template, fills in the variables, attaches your CV, and sends.' },
];

function HowItWorks() {
  return (
    <section style={{ background: BG, padding: '100px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12.5px', fontWeight: '600', color: GRAY, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              How it works
            </p>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700',
              color: ACCENT, letterSpacing: '-0.03em', margin: 0,
              fontFamily: 'system-ui, sans-serif',
            }}>
              Up and running<br />in under 10 minutes.
            </h2>
          </div>
        </FadeUp>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {STEPS.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.08}>
              <div style={{
                display: 'flex', gap: '24px', alignItems: 'flex-start',
                padding: '24px 0',
                borderBottom: i < STEPS.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: ACCENT, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '700',
                  flexShrink: 0, letterSpacing: '0.02em',
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: ACCENT, margin: '0 0 6px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: GRAY, lineHeight: 1.7, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ── */
function Pricing() {
  return (
    <section style={{ background: SOFT, padding: '100px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>

        <FadeUp>
          <p style={{ fontSize: '12.5px', fontWeight: '600', color: GRAY, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Pricing
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700',
            color: ACCENT, letterSpacing: '-0.03em', margin: '0 0 48px',
            fontFamily: 'system-ui, sans-serif',
          }}>
            Free. Full stop.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{
            background: '#fff', borderRadius: '16px',
            border: `1px solid ${BORDER}`, padding: '36px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', fontWeight: '500', color: GRAY, margin: '0 0 8px' }}>Free plan</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: 'center' }}>
                <span style={{ fontSize: '48px', fontWeight: '700', color: ACCENT, letterSpacing: '-0.04em' }}>$0</span>
                <span style={{ fontSize: '14px', color: GRAY }}>/month</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', textAlign: 'left' }}>
              {[
                'Up to 10 emails per day',
                'Unlimited companies',
                '3 email templates + 1 follow-up',
                'CV attachment per template',
                'Scheduled & manual sending',
                'Email log & notifications',
                'Your own Gmail — no shared domain',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '10px', color: '#16A34A' }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '13.5px', color: '#374151' }}>{item}</span>
                </div>
              ))}
            </div>

            <Link to="/signup" style={{
              display: 'block', textAlign: 'center',
              fontSize: '14px', fontWeight: '600',
              color: '#fff', background: ACCENT,
              textDecoration: 'none',
              padding: '13px', borderRadius: '9px',
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Get started free →
            </Link>

            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '12px' }}>
              No credit card. No trial period. Just free.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── CTA BAND ── */
function CTABand() {
  return (
    <section style={{
      background: ACCENT, padding: '80px 24px',
      textAlign: 'center',
    }}>
      <FadeUp>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700',
          color: '#fff', letterSpacing: '-0.03em',
          margin: '0 0 16px',
          fontFamily: 'system-ui, sans-serif',
        }}>
          Start reaching out today.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', margin: '0 0 32px', lineHeight: 1.6 }}>
          Set up in minutes. Your next job or client is one email away.
        </p>
        <Link to="/signup" style={{
          display: 'inline-block',
          fontSize: '14px', fontWeight: '600',
          color: ACCENT, background: '#fff',
          textDecoration: 'none',
          padding: '13px 32px', borderRadius: '9px',
          transition: 'opacity 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Create free account →
        </Link>
      </FadeUp>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{
      background: BG, borderTop: `1px solid ${BORDER}`,
      padding: '32px 40px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
    }}>
      <span style={{ fontSize: '15px', fontWeight: '700', color: ACCENT, letterSpacing: '-0.3px' }}>
        Reachio
      </span>

      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { label: 'Log in',       to: '/login'  },
          { label: 'Sign up',      to: '/signup' },
        ].map(link => (
          <Link key={link.label} to={link.to} style={{
            fontSize: '13px', color: GRAY,
            textDecoration: 'none', transition: 'color 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = ACCENT}
            onMouseLeave={e => e.currentTarget.style.color = GRAY}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p style={{ fontSize: '12.5px', color: '#9CA3AF', margin: 0 }}>
        © {new Date().getFullYear()} Reachio. Built by{' '}
        <a href="https://daniel-elemide.vercel.app" target="_blank" rel="noreferrer"
          style={{ color: ACCENT, textDecoration: 'none' }}>
          Daniel Elemide
        </a>
      </p>
    </footer>
  );
}

/* ── ROOT ── */
export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: BG }}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTABand />
      <Footer />
    </div>
  );
}