export interface HhResponse {
    per_page: number
    items: Vacancy[]
    page: number
    pages: number
    found: number
    clusters: any
    arguments: any
}

export interface Vacancy {
    salary: Salary
    name: string
    insider_interview: InsiderInterview
    area: Area
    url: string
    published_at: string
    relations: any[]
    employer: Employer
    contacts: Contacts
    response_letter_required: boolean
    address: Address
    sort_point_distance: number
    alternate_url: string
    apply_alternate_url: string
    department: Department
    type: Type
    id: string
    has_test: boolean
    response_url: any
    snippet: Snippet
    schedule: Schedule
    counters: Counters
}

export interface Salary {
    to: any
    from: number
    currency: string
    gross: boolean
}

export interface InsiderInterview {
    id: string
    url: string
}

export interface Area {
    url: string
    id: string
    name: string
}

export interface Employer {
    logo_urls: LogoUrls
    name: string
    url: string
    alternate_url: string
    id: string
    trusted: boolean
}

export interface LogoUrls {
    "90": string
    "240": string
    original: string
}

export interface Contacts {
    name: string
    email: string
    phones: Phone[]
}

export interface Phone {
    country: string
    city: string
    number: string
    comment: any
}

export interface Address {
    city: string
    street: string
    building: string
    description: string
    lat: number
    lng: number
    metro_stations: MetroStation[]
}

export interface MetroStation {
    station_id: string
    station_name: string
    line_id: string
    line_name: string
    lat: number
    lng: number
}

export interface Department {
    id: string
    name: string
}

export interface Type {
    id: string
    name: string
}

export interface Snippet {
    requirement: string
    responsibility: string
}

export interface Schedule {
    id: string
    name: string
}

export interface Counters {
    responses: number
}
