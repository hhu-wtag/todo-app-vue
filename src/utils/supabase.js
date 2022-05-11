import { createClient } from "@supabase/supabase-js"

class Supabase {
  constructor() {
    if (Supabase.instance) {
      return Supabase.instance
    }

    this.connection = createClient(
      "https://umzvvrrxvrkseldbmrxc.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtenZ2cnJ4dnJrc2VsZGJtcnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY1NDk2NjQsImV4cCI6MTk2MjEyNTY2NH0.n8syuxaHjiGmC3R6DoFcuoqe6pNpkB--2BYSa_9d7fA"
    )

    Supabase.instance = this
  }
}

export default new Supabase().connection
