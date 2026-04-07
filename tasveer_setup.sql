--
-- PostgreSQL database dump
--

\restrict ErsIN5Tq9Dj3OMoh9hhugEfIfwllfxaa7afOwgUg2yEPXyFL1eHtiJJxDrv4Ht2

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-08 01:03:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 239 (class 1259 OID 16589)
-- Name: admin_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_settings (
    setting_id integer NOT NULL,
    commission_percentage numeric(5,2) DEFAULT 10.00,
    last_updated_by integer
);


ALTER TABLE public.admin_settings OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16588)
-- Name: admin_settings_setting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_settings_setting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_settings_setting_id_seq OWNER TO postgres;

--
-- TOC entry 5149 (class 0 OID 0)
-- Dependencies: 238
-- Name: admin_settings_setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_settings_setting_id_seq OWNED BY public.admin_settings.setting_id;


--
-- TOC entry 224 (class 1259 OID 16427)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    client_id integer,
    photographer_id integer,
    event_type character varying(100),
    event_date date NOT NULL,
    status character varying(20) DEFAULT 'Pending'::character varying,
    total_amount numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT bookings_status_check CHECK (((status)::text = ANY ((ARRAY['Pending'::character varying, 'Accepted'::character varying, 'Rejected'::character varying, 'Completed'::character varying, 'Cancelled'::character varying])::text[])))
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16426)
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_booking_id_seq OWNER TO postgres;

--
-- TOC entry 5150 (class 0 OID 0)
-- Dependencies: 223
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- TOC entry 241 (class 1259 OID 16603)
-- Name: disputes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disputes (
    dispute_id integer NOT NULL,
    booking_id integer,
    raised_by_id integer,
    reason text NOT NULL,
    status character varying(20) DEFAULT 'Open'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT disputes_status_check CHECK (((status)::text = ANY ((ARRAY['Open'::character varying, 'In-Progress'::character varying, 'Resolved'::character varying, 'Dismissed'::character varying])::text[])))
);


ALTER TABLE public.disputes OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16602)
-- Name: disputes_dispute_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disputes_dispute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.disputes_dispute_id_seq OWNER TO postgres;

--
-- TOC entry 5151 (class 0 OID 0)
-- Dependencies: 240
-- Name: disputes_dispute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disputes_dispute_id_seq OWNED BY public.disputes.dispute_id;


--
-- TOC entry 237 (class 1259 OID 16561)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    booking_id integer,
    message_text text NOT NULL,
    is_read boolean DEFAULT false,
    sent_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16560)
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_message_id_seq OWNER TO postgres;

--
-- TOC entry 5152 (class 0 OID 0)
-- Dependencies: 236
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- TOC entry 243 (class 1259 OID 16627)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    user_id integer,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16626)
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_notification_id_seq OWNER TO postgres;

--
-- TOC entry 5153 (class 0 OID 0)
-- Dependencies: 242
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- TOC entry 228 (class 1259 OID 16478)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    booking_id integer,
    transaction_id character varying(255),
    amount numeric(10,2) NOT NULL,
    payment_status character varying(20) DEFAULT 'Pending'::character varying,
    payment_method character varying(50),
    paid_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16477)
-- Name: payments_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_payment_id_seq OWNER TO postgres;

--
-- TOC entry 5154 (class 0 OID 0)
-- Dependencies: 227
-- Name: payments_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;


--
-- TOC entry 235 (class 1259 OID 16543)
-- Name: photographer_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photographer_details (
    detail_id integer NOT NULL,
    photographer_id integer,
    social_instagram character varying(255),
    social_facebook character varying(255),
    refund_policy_text text,
    experience_years integer DEFAULT 0
);


ALTER TABLE public.photographer_details OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16542)
-- Name: photographer_details_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.photographer_details_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.photographer_details_detail_id_seq OWNER TO postgres;

--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 234
-- Name: photographer_details_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photographer_details_detail_id_seq OWNED BY public.photographer_details.detail_id;


--
-- TOC entry 222 (class 1259 OID 16408)
-- Name: photographer_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photographer_profiles (
    profile_id integer NOT NULL,
    user_id integer,
    bio text,
    experience_years integer,
    location character varying(255),
    specializations text[],
    pricing_packages jsonb,
    portfolio_urls text[],
    availability_status boolean DEFAULT true,
    rating_avg numeric(3,2) DEFAULT 0.0
);


ALTER TABLE public.photographer_profiles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: photographer_profiles_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.photographer_profiles_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.photographer_profiles_profile_id_seq OWNER TO postgres;

--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 221
-- Name: photographer_profiles_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photographer_profiles_profile_id_seq OWNED BY public.photographer_profiles.profile_id;


--
-- TOC entry 231 (class 1259 OID 16508)
-- Name: photographer_specs_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photographer_specs_link (
    photographer_id integer NOT NULL,
    spec_id integer NOT NULL
);


ALTER TABLE public.photographer_specs_link OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16645)
-- Name: portfolio_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portfolio_media (
    media_id integer NOT NULL,
    photographer_id integer,
    media_url text NOT NULL,
    media_type character varying(10),
    is_featured boolean DEFAULT false,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT portfolio_media_media_type_check CHECK (((media_type)::text = ANY ((ARRAY['image'::character varying, 'video'::character varying])::text[])))
);


ALTER TABLE public.portfolio_media OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 16644)
-- Name: portfolio_media_media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.portfolio_media_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portfolio_media_media_id_seq OWNER TO postgres;

--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 244
-- Name: portfolio_media_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.portfolio_media_media_id_seq OWNED BY public.portfolio_media.media_id;


--
-- TOC entry 233 (class 1259 OID 16526)
-- Name: pricing_packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pricing_packages (
    package_id integer NOT NULL,
    photographer_id integer,
    title character varying(100) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    duration_hours integer
);


ALTER TABLE public.pricing_packages OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16525)
-- Name: pricing_packages_package_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pricing_packages_package_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pricing_packages_package_id_seq OWNER TO postgres;

--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 232
-- Name: pricing_packages_package_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pricing_packages_package_id_seq OWNED BY public.pricing_packages.package_id;


--
-- TOC entry 226 (class 1259 OID 16449)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    booking_id integer,
    client_id integer,
    photographer_id integer,
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16448)
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_review_id_seq OWNER TO postgres;

--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 225
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- TOC entry 230 (class 1259 OID 16498)
-- Name: specializations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specializations (
    spec_id integer NOT NULL,
    spec_name character varying(50) NOT NULL
);


ALTER TABLE public.specializations OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16497)
-- Name: specializations_spec_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specializations_spec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.specializations_spec_id_seq OWNER TO postgres;

--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 229
-- Name: specializations_spec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specializations_spec_id_seq OWNED BY public.specializations.spec_id;


--
-- TOC entry 220 (class 1259 OID 16389)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) NOT NULL,
    phone_number character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['Photographer'::character varying, 'Client'::character varying, 'Admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16388)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4893 (class 2604 OID 16592)
-- Name: admin_settings setting_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_settings ALTER COLUMN setting_id SET DEFAULT nextval('public.admin_settings_setting_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 16430)
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- TOC entry 4895 (class 2604 OID 16606)
-- Name: disputes dispute_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes ALTER COLUMN dispute_id SET DEFAULT nextval('public.disputes_dispute_id_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 16564)
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- TOC entry 4898 (class 2604 OID 16630)
-- Name: notifications notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- TOC entry 4883 (class 2604 OID 16481)
-- Name: payments payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);


--
-- TOC entry 4888 (class 2604 OID 16546)
-- Name: photographer_details detail_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_details ALTER COLUMN detail_id SET DEFAULT nextval('public.photographer_details_detail_id_seq'::regclass);


--
-- TOC entry 4875 (class 2604 OID 16411)
-- Name: photographer_profiles profile_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_profiles ALTER COLUMN profile_id SET DEFAULT nextval('public.photographer_profiles_profile_id_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 16648)
-- Name: portfolio_media media_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio_media ALTER COLUMN media_id SET DEFAULT nextval('public.portfolio_media_media_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 16529)
-- Name: pricing_packages package_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricing_packages ALTER COLUMN package_id SET DEFAULT nextval('public.pricing_packages_package_id_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 16452)
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- TOC entry 4886 (class 2604 OID 16501)
-- Name: specializations spec_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specializations ALTER COLUMN spec_id SET DEFAULT nextval('public.specializations_spec_id_seq'::regclass);


--
-- TOC entry 4873 (class 2604 OID 16392)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5137 (class 0 OID 16589)
-- Dependencies: 239
-- Data for Name: admin_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_settings (setting_id, commission_percentage, last_updated_by) FROM stdin;
\.


--
-- TOC entry 5122 (class 0 OID 16427)
-- Dependencies: 224
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (booking_id, client_id, photographer_id, event_type, event_date, status, total_amount, created_at) FROM stdin;
\.


--
-- TOC entry 5139 (class 0 OID 16603)
-- Dependencies: 241
-- Data for Name: disputes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disputes (dispute_id, booking_id, raised_by_id, reason, status, created_at) FROM stdin;
\.


--
-- TOC entry 5135 (class 0 OID 16561)
-- Dependencies: 237
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (message_id, sender_id, receiver_id, booking_id, message_text, is_read, sent_at) FROM stdin;
\.


--
-- TOC entry 5141 (class 0 OID 16627)
-- Dependencies: 243
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (notification_id, user_id, message, is_read, created_at) FROM stdin;
\.


--
-- TOC entry 5126 (class 0 OID 16478)
-- Dependencies: 228
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (payment_id, booking_id, transaction_id, amount, payment_status, payment_method, paid_at) FROM stdin;
\.


--
-- TOC entry 5133 (class 0 OID 16543)
-- Dependencies: 235
-- Data for Name: photographer_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photographer_details (detail_id, photographer_id, social_instagram, social_facebook, refund_policy_text, experience_years) FROM stdin;
\.


--
-- TOC entry 5120 (class 0 OID 16408)
-- Dependencies: 222
-- Data for Name: photographer_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photographer_profiles (profile_id, user_id, bio, experience_years, location, specializations, pricing_packages, portfolio_urls, availability_status, rating_avg) FROM stdin;
\.


--
-- TOC entry 5129 (class 0 OID 16508)
-- Dependencies: 231
-- Data for Name: photographer_specs_link; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photographer_specs_link (photographer_id, spec_id) FROM stdin;
\.


--
-- TOC entry 5143 (class 0 OID 16645)
-- Dependencies: 245
-- Data for Name: portfolio_media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.portfolio_media (media_id, photographer_id, media_url, media_type, is_featured, uploaded_at) FROM stdin;
\.


--
-- TOC entry 5131 (class 0 OID 16526)
-- Dependencies: 233
-- Data for Name: pricing_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pricing_packages (package_id, photographer_id, title, description, price, duration_hours) FROM stdin;
\.


--
-- TOC entry 5124 (class 0 OID 16449)
-- Dependencies: 226
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (review_id, booking_id, client_id, photographer_id, rating, comment, created_at) FROM stdin;
\.


--
-- TOC entry 5128 (class 0 OID 16498)
-- Dependencies: 230
-- Data for Name: specializations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specializations (spec_id, spec_name) FROM stdin;
\.


--
-- TOC entry 5118 (class 0 OID 16389)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, full_name, email, password_hash, role, phone_number, created_at) FROM stdin;
\.


--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 238
-- Name: admin_settings_setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_settings_setting_id_seq', 1, false);


--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 223
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 1, false);


--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 240
-- Name: disputes_dispute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disputes_dispute_id_seq', 1, false);


--
-- TOC entry 5165 (class 0 OID 0)
-- Dependencies: 236
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 1, false);


--
-- TOC entry 5166 (class 0 OID 0)
-- Dependencies: 242
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 1, false);


--
-- TOC entry 5167 (class 0 OID 0)
-- Dependencies: 227
-- Name: payments_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_payment_id_seq', 1, false);


--
-- TOC entry 5168 (class 0 OID 0)
-- Dependencies: 234
-- Name: photographer_details_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.photographer_details_detail_id_seq', 1, false);


--
-- TOC entry 5169 (class 0 OID 0)
-- Dependencies: 221
-- Name: photographer_profiles_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.photographer_profiles_profile_id_seq', 1, false);


--
-- TOC entry 5170 (class 0 OID 0)
-- Dependencies: 244
-- Name: portfolio_media_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.portfolio_media_media_id_seq', 1, false);


--
-- TOC entry 5171 (class 0 OID 0)
-- Dependencies: 232
-- Name: pricing_packages_package_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pricing_packages_package_id_seq', 1, false);


--
-- TOC entry 5172 (class 0 OID 0)
-- Dependencies: 225
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, false);


--
-- TOC entry 5173 (class 0 OID 0)
-- Dependencies: 229
-- Name: specializations_spec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.specializations_spec_id_seq', 1, false);


--
-- TOC entry 5174 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 4944 (class 2606 OID 16596)
-- Name: admin_settings admin_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_settings
    ADD CONSTRAINT admin_settings_pkey PRIMARY KEY (setting_id);


--
-- TOC entry 4918 (class 2606 OID 16437)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- TOC entry 4946 (class 2606 OID 16615)
-- Name: disputes disputes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes
    ADD CONSTRAINT disputes_pkey PRIMARY KEY (dispute_id);


--
-- TOC entry 4942 (class 2606 OID 16572)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- TOC entry 4948 (class 2606 OID 16638)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- TOC entry 4924 (class 2606 OID 16489)
-- Name: payments payments_booking_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_booking_id_key UNIQUE (booking_id);


--
-- TOC entry 4926 (class 2606 OID 16487)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- TOC entry 4928 (class 2606 OID 16491)
-- Name: payments payments_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_transaction_id_key UNIQUE (transaction_id);


--
-- TOC entry 4938 (class 2606 OID 16554)
-- Name: photographer_details photographer_details_photographer_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_details
    ADD CONSTRAINT photographer_details_photographer_id_key UNIQUE (photographer_id);


--
-- TOC entry 4940 (class 2606 OID 16552)
-- Name: photographer_details photographer_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_details
    ADD CONSTRAINT photographer_details_pkey PRIMARY KEY (detail_id);


--
-- TOC entry 4914 (class 2606 OID 16418)
-- Name: photographer_profiles photographer_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_profiles
    ADD CONSTRAINT photographer_profiles_pkey PRIMARY KEY (profile_id);


--
-- TOC entry 4916 (class 2606 OID 16420)
-- Name: photographer_profiles photographer_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_profiles
    ADD CONSTRAINT photographer_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4934 (class 2606 OID 16514)
-- Name: photographer_specs_link photographer_specs_link_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_specs_link
    ADD CONSTRAINT photographer_specs_link_pkey PRIMARY KEY (photographer_id, spec_id);


--
-- TOC entry 4950 (class 2606 OID 16657)
-- Name: portfolio_media portfolio_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio_media
    ADD CONSTRAINT portfolio_media_pkey PRIMARY KEY (media_id);


--
-- TOC entry 4936 (class 2606 OID 16536)
-- Name: pricing_packages pricing_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricing_packages
    ADD CONSTRAINT pricing_packages_pkey PRIMARY KEY (package_id);


--
-- TOC entry 4920 (class 2606 OID 16461)
-- Name: reviews reviews_booking_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_booking_id_key UNIQUE (booking_id);


--
-- TOC entry 4922 (class 2606 OID 16459)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- TOC entry 4930 (class 2606 OID 16505)
-- Name: specializations specializations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specializations
    ADD CONSTRAINT specializations_pkey PRIMARY KEY (spec_id);


--
-- TOC entry 4932 (class 2606 OID 16507)
-- Name: specializations specializations_spec_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specializations
    ADD CONSTRAINT specializations_spec_name_key UNIQUE (spec_name);


--
-- TOC entry 4910 (class 2606 OID 16405)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4912 (class 2606 OID 16403)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4965 (class 2606 OID 16597)
-- Name: admin_settings admin_settings_last_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_settings
    ADD CONSTRAINT admin_settings_last_updated_by_fkey FOREIGN KEY (last_updated_by) REFERENCES public.users(user_id);


--
-- TOC entry 4952 (class 2606 OID 16438)
-- Name: bookings bookings_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(user_id);


--
-- TOC entry 4953 (class 2606 OID 16443)
-- Name: bookings bookings_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.users(user_id);


--
-- TOC entry 4966 (class 2606 OID 16616)
-- Name: disputes disputes_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes
    ADD CONSTRAINT disputes_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id);


--
-- TOC entry 4967 (class 2606 OID 16621)
-- Name: disputes disputes_raised_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes
    ADD CONSTRAINT disputes_raised_by_id_fkey FOREIGN KEY (raised_by_id) REFERENCES public.users(user_id);


--
-- TOC entry 4962 (class 2606 OID 16583)
-- Name: messages messages_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id);


--
-- TOC entry 4963 (class 2606 OID 16578)
-- Name: messages messages_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(user_id);


--
-- TOC entry 4964 (class 2606 OID 16573)
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(user_id);


--
-- TOC entry 4968 (class 2606 OID 16639)
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4957 (class 2606 OID 16492)
-- Name: payments payments_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id);


--
-- TOC entry 4961 (class 2606 OID 16555)
-- Name: photographer_details photographer_details_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_details
    ADD CONSTRAINT photographer_details_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4951 (class 2606 OID 16421)
-- Name: photographer_profiles photographer_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_profiles
    ADD CONSTRAINT photographer_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4958 (class 2606 OID 16515)
-- Name: photographer_specs_link photographer_specs_link_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_specs_link
    ADD CONSTRAINT photographer_specs_link_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4959 (class 2606 OID 16520)
-- Name: photographer_specs_link photographer_specs_link_spec_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photographer_specs_link
    ADD CONSTRAINT photographer_specs_link_spec_id_fkey FOREIGN KEY (spec_id) REFERENCES public.specializations(spec_id) ON DELETE CASCADE;


--
-- TOC entry 4969 (class 2606 OID 16658)
-- Name: portfolio_media portfolio_media_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio_media
    ADD CONSTRAINT portfolio_media_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4960 (class 2606 OID 16537)
-- Name: pricing_packages pricing_packages_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricing_packages
    ADD CONSTRAINT pricing_packages_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4954 (class 2606 OID 16462)
-- Name: reviews reviews_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id);


--
-- TOC entry 4955 (class 2606 OID 16467)
-- Name: reviews reviews_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(user_id);


--
-- TOC entry 4956 (class 2606 OID 16472)
-- Name: reviews reviews_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.users(user_id);


-- Completed on 2026-04-08 01:03:52

--
-- PostgreSQL database dump complete
--

\unrestrict ErsIN5Tq9Dj3OMoh9hhugEfIfwllfxaa7afOwgUg2yEPXyFL1eHtiJJxDrv4Ht2

