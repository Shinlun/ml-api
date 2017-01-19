--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ml_dev; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ml_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'French_France.1252' LC_CTYPE = 'French_France.1252';


ALTER DATABASE ml_dev OWNER TO postgres;

\connect ml_dev

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

--
-- Name: event_type; Type: TYPE; Schema: public; Owner: ml_dev
--

CREATE TYPE event_type AS ENUM (
    'birth',
    'engagement',
    'marriage',
    'death',
    'holidays',
    'announcement',
    'news',
    'other'
);


ALTER TYPE event_type OWNER TO ml_dev;

--
-- Name: relationship; Type: TYPE; Schema: public; Owner: ml_dev
--

CREATE TYPE relationship AS ENUM (
    'grandfather',
    'grandmother',
    'father',
    'mother',
    'son',
    'daughter',
    'brother',
    'sister',
    'husband',
    'wife',
    'boyfriend',
    'girlfriend',
    'cousin',
    'other'
);


ALTER TYPE relationship OWNER TO ml_dev;

--
-- Name: sex; Type: TYPE; Schema: public; Owner: ml_dev
--

CREATE TYPE sex AS ENUM (
    'M',
    'F'
);


ALTER TYPE sex OWNER TO ml_dev;

--
-- Name: visibility; Type: TYPE; Schema: public; Owner: ml_dev
--

CREATE TYPE visibility AS ENUM (
    'public',
    'private'
);


ALTER TYPE visibility OWNER TO ml_dev;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE comments (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    author_id uuid,
    event_id uuid NOT NULL,
    body text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE comments OWNER TO ml_dev;

--
-- Name: conversations; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE conversations (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE conversations OWNER TO ml_dev;

--
-- Name: conversations_users; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE conversations_users (
    conversation_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE conversations_users OWNER TO ml_dev;

--
-- Name: events; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE events (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    author_id uuid,
    type event_type NOT NULL,
    title character varying(255) NOT NULL,
    body text,
    date timestamp without time zone,
    visibility visibility NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE events OWNER TO ml_dev;

--
-- Name: events_groups; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE events_groups (
    event_id uuid NOT NULL,
    group_id uuid NOT NULL
);


ALTER TABLE events_groups OWNER TO ml_dev;

--
-- Name: events_users; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE events_users (
    event_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE events_users OWNER TO ml_dev;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE groups (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    visibility visibility NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE groups OWNER TO ml_dev;

--
-- Name: groups_users; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE groups_users (
    group_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE groups_users OWNER TO ml_dev;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE messages (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    user_id uuid,
    conversation_id uuid NOT NULL,
    body text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE messages OWNER TO ml_dev;

--
-- Name: relationships; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE relationships (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    user1_id uuid NOT NULL,
    user2_id uuid NOT NULL,
    relationship relationship NOT NULL,
    other character varying(255),
    date timestamp without time zone
);


ALTER TABLE relationships OWNER TO ml_dev;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ml_dev
--

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    dob timestamp without time zone,
    dop timestamp without time zone,
    sex sex,
    tutorial boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE users OWNER TO ml_dev;

--
-- Name: comments_pkey; Type: CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: groups_pkey; Type: CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: messages_pkey; Type: CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: relationships_pkey; Type: CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY relationships
    ADD CONSTRAINT relationships_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: conversation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY conversations_users
    ADD CONSTRAINT conversation_fkey FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;


--
-- Name: conversation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT conversation_fkey FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;


--
-- Name: event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY events_users
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE;


--
-- Name: event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY events_groups
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE;


--
-- Name: event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT event_fkey FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE;


--
-- Name: group_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY groups_users
    ADD CONSTRAINT group_fkey FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;


--
-- Name: group_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY events_groups
    ADD CONSTRAINT group_fkey FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;


--
-- Name: user1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY relationships
    ADD CONSTRAINT user1_fkey FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: user2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY relationships
    ADD CONSTRAINT user2_fkey FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY groups_users
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY events
    ADD CONSTRAINT user_fkey FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY events_users
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT user_fkey FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY conversations_users
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ml_dev
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

