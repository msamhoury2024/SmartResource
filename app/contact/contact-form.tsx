"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

const MAX_MESSAGE_LENGTH = 5000

const getStringValue = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

const getDashboardEndpoints = () => {
  let baseUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL?.trim() || '';
  // Remove all paths, keep only protocol and domain
  try {
    const urlObj = new URL(baseUrl);
    baseUrl = urlObj.origin;
  } catch {
    // fallback: remove everything after domain
    baseUrl = baseUrl.replace(/^(https?:\/\/[^\/]+).*/, '$1');
  }

  if (!baseUrl) {
    throw new Error('Dashboard URL is not configured.')
  }

  return [`${baseUrl}/api/marketing/emails`]
}

const subscribeMarketingLead = async (name: string, email: string, message: string) => {
  const payload = {
    email,
    name,
    source: 'website-contact-form',
    tags: ['contact'],
    message: message,
  }

  let lastError = 'Unable to save your contact details right now.'

  for (const endpoint of getDashboardEndpoints()) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok || response.status === 409) {
      return
    }

    const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''
    const responseBody = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : null

    if (response.status !== 404) {
      lastError =
        responseBody &&
        typeof responseBody === 'object' &&
        'error' in responseBody &&
        typeof responseBody.error === 'string'
          ? responseBody.error
          : lastError

      throw new Error(lastError)
    }
  }

  throw new Error(lastError)
}

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const firstName = getStringValue(formData, 'first-name')
        const lastName = getStringValue(formData, 'last-name')
        const userEmail = getStringValue(formData, 'userEmail')
        const message = getStringValue(formData, 'message')

        if (!firstName || !lastName || !userEmail || !message) {
          toast.error('Please fill out all the fields.')
          return
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
          toast.error(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`)
          return
        }

        const name = `${firstName} ${lastName}`

        setIsSubmitting(true)

        try {
         await subscribeMarketingLead(name, userEmail, message)
         e.currentTarget.reset()
         toast.success('Message sent successfully.');
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Message failed to send. Please try again.');
        } finally {
          setIsSubmitting(false)
      }
    
    }
  return (
    <form onSubmit={onSubmit} className="lg:flex-auto">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label
          htmlFor="first-name"
          className="block text-sm/6 font-semibold text-foreground"
        >
          First name
        </label>
        <div className="mt-2.5">
          <Input name="first-name" placeholder="John" required disabled={isSubmitting} />
        </div>
      </div>
      <div>
        <label
          htmlFor="last-name"
          className="block text-sm/6 font-semibold text-foreground"
        >
          Last name
        </label>
        <div className="mt-2.5">
          <Input name="last-name" placeholder="Doe" required disabled={isSubmitting} />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="last-name"
          className="block text-sm/6 font-semibold text-foreground"
        >
          Email
        </label>
        <div className="mt-2.5">
          <Input className="w-full" name="userEmail" type="email" placeholder="johndoe@gmail.com" required disabled={isSubmitting} />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block text-sm/6 font-semibold text-foreground"
        >
          Message
        </label>
        <div className="mt-2.5">
          <Textarea name="message" placeholder="Enter your message here ..." rows={5} required disabled={isSubmitting} maxLength={MAX_MESSAGE_LENGTH} />
        </div>
      </div>
    </div>
    <div className="mt-10">
      <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Let\'s talk'}</Button>
    </div>
    <p className="mt-4 text-sm/6 text-gray-500">
      By submitting this form, I agree to the{" "}
      <Link href="/privacy-policy" className="font-semibold text-primary">
        privacy&nbsp;policy
      </Link>
      .
    </p>
  </form>
  )
}

export default ContactForm