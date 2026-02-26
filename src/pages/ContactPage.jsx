import { useState } from "react";

export default function ContactPage(){
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({name: '', email: '', message: ''});

    const handleChange = (e) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    }

    if(sent) {
        return (
            <div className="max-w-sm mx-auto pt-16">
                <div className="bg-surface border border-border-default rounded-xl p-8 text-center space-y-3">
                    <div className="text-3xl">Success</div>
                    <h2 className="font-display text-xl text-fg">
                        Message sent!
                    </h2>
                    <p className="text-sm text-fg-muted">
                        Your message has been sent, we'll get back to you as soon as possible. 
                    </p>
                    <button className="mt-2 text-xs text-fg-faint underline underline-offset-2 hover:text-fg-muted transition-colors" onClick={() => {setSent(false); setForm({name: '', email: '', message: ''})}}>
                        Send another message
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-sm mx-auto pt-16">
            <h1 className="font-display text-3xl text-fg mb-2">Contact</h1>
            <p className="text-sm text-fg-muted mb-8">Have a question or feedback? Send us a message.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-fg-muted mb-2">Name</label>
                    <input type="text" name="name" id="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-default text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors text-sm" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-fg-muted mb-2">Email</label>
                    <input type="email" name="email" id="email" value={form.email} onChange={handleChange} required placeholder="Your email" className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-default text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors text-sm" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-widest text-fg-muted mb-2">Message</label>
                    <textarea name="message" id="message" value={form.message} onChange={handleChange} required placeholder="Your message" className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-default text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors text-sm" />
                </div>

                <button type="submit" className="w-full bg-cta text-cta-fg py-2.5 rounded-full text-sm font-medium hover:bg-cta-hover transition-colors">
                    Send message
                </button>
            </form>
        </div>
    )
}