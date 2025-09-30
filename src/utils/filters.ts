// Filters for user data projection
export let userBasicData = {
    full_name: 1,
    city: 1,
    password_hash: 1,
    last_zakat_date: 1,
    zakat_reminders_enabled: 1,
    created_at: 1,
};

export let userBasic = { email: 1, fullname: 1 };

export let userProjectionData = {
    email: 1,
    full_name: 1,
    city: 1,
    password_hash: 1,
    last_zakat_date: 1,
    zakat_reminders_enabled: 1,
    campaign_updates_enabled: 1,
    supabase_user_id: 1,
};
