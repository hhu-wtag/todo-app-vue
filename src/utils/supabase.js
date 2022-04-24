import { createClient } from "@supabase/supabase-js"

class Supabase {
  constructor() {
    if (Supabase.instance) {
      return Supabase.instance
    }

    this.connection = createClient(
      process.env.VUE_APP_SUPABASE_URL,
      process.env.VUE_APP_SUPABASE_ANON_KEY
    )

    Supabase.instance = this
  }
}

export default new Supabase().connection
