import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ContactPage = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (sent) setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const hours = [
    { day: t('contact.hours.weekdays'), value: '09:00 — 20:00' },
    { day: t('contact.hours.saturday'), value: '10:00 — 18:00' },
    { day: t('contact.hours.sunday'), value: t('contact.hours.closed') },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-10 text-center">
        <div className="mb-5 flex items-center justify-center gap-3 text-gold-600 dark:text-gold-400">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em]">
            {t('contact.eyebrow')}
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
        </div>
        <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
          {t('contact.titlePart')}{' '}
          <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
            {t('contact.titleAccent')}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          {t('contact.subtitle')}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Info column */}
          <div className="space-y-5 lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-soft">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-neutral-900 dark:text-white">
                  {t('contact.address.title')}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {t('contact.address.line1')}
                <br />
                {t('contact.address.line2')}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-soft">
                  <Phone className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-neutral-900 dark:text-white">
                  {t('contact.callUs')}
                </h3>
              </div>
              <a
                href="tel:+40754629321"
                className="mt-3 block text-sm font-medium text-gold-700 transition-colors hover:text-gold-500 dark:text-gold-300"
              >
                +40 754 629 321
              </a>
              <a
                href="mailto:hello@happiness-salon.md"
                className="mt-1 flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-gold-700 dark:text-neutral-300 dark:hover:text-gold-300"
              >
                <Mail className="h-4 w-4" />
                hello@happiness-salon.md
              </a>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-soft">
                  <Clock className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-neutral-900 dark:text-white">
                  {t('contact.hoursTitle')}
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between border-b border-gold-100/60 pb-1 last:border-0 last:pb-0 dark:border-gold-800/40"
                  >
                    <span className="text-neutral-600 dark:text-neutral-300">{h.day}</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-100">
                      {h.value}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-neutral-900 dark:text-white">
                {t('contact.followUs')}
              </h3>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-300/70 bg-white/70 text-gold-700 transition-colors hover:bg-gold-50 dark:border-gold-700/50 dark:bg-neutral-900/70 dark:text-gold-300 dark:hover:bg-neutral-800"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-300/70 bg-white/70 text-gold-700 transition-colors hover:bg-gold-50 dark:border-gold-700/50 dark:bg-neutral-900/70 dark:text-gold-300 dark:hover:bg-neutral-800"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.7V14h2.7v8h3.1z" />
                  </svg>
                </a>
              </div>
            </Card>
          </div>

          {/* Form + Map */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                  {t('contact.formEyebrow')}
                </span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-semibold text-neutral-900 dark:text-white">
                {t('contact.formTitle')}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {t('contact.formSubtitle')}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block md:col-span-1">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                    {t('form.fullName')}
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('form.namePlaceholder')}
                    required
                    className="w-full rounded-xl border border-gold-200/80 bg-white/80 px-4 py-2.5 text-sm text-neutral-800 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40 dark:border-gold-700/40 dark:bg-neutral-900/70 dark:text-neutral-100"
                  />
                </label>
                <label className="block md:col-span-1">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                    {t('contact.emailLabel')}
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-gold-200/80 bg-white/80 px-4 py-2.5 text-sm text-neutral-800 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40 dark:border-gold-700/40 dark:bg-neutral-900/70 dark:text-neutral-100"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                    {t('contact.messageLabel')}
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    required
                    className="w-full resize-none rounded-xl border border-gold-200/80 bg-white/80 px-4 py-2.5 text-sm text-neutral-800 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40 dark:border-gold-700/40 dark:bg-neutral-900/70 dark:text-neutral-100"
                  />
                </label>
                <div className="flex items-center justify-between md:col-span-2">
                  <p
                    className={`text-sm transition-opacity ${
                      sent ? 'text-emerald-600 opacity-100 dark:text-emerald-400' : 'opacity-0'
                    }`}
                  >
                    {t('contact.sentMessage')}
                  </p>
                  <Button type="submit" size="lg">
                    <Send className="h-4 w-4" />
                    {t('contact.sendBtn')}
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="overflow-hidden">
              <iframe
                title="HAPPINESS Salon location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2733.1842671163613!2d23.60354287654807!3d46.761264245968384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa5e3fe6fc6dea549%3A0x32969aa1cad851b2!2sS.C.%20Happiness%20S.R.L!5e0!3m2!1sen!2s!4v1777827663498!5m2!1sen!2s"
                className="h-[320px] w-full border-0"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
