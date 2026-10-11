import { z } from "zod";

export const inquiryTypes = [
  { value: "booking", label: "A booking question" },
  { value: "general", label: "General enquiry" },
  { value: "group", label: "Group or event booking" },
  { value: "feedback", label: "Feedback" },
  { value: "careers", label: "Working with us" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Keep your name under 80 characters."),
  email: z.string().trim().email("Enter a valid email address, like name@example.com."),
  inquiry: z.enum(inquiryTypes.map((i) => i.value) as [string, ...string[]], { message: "Choose what your message is about." }),
  message: z.string().trim().min(10, "Add a little more detail — at least 10 characters.").max(2000, "Keep your message under 2,000 characters."),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
