PGDMP  :                     |            ABC_Pharmacy    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16436    ABC_Pharmacy    DATABASE     �   CREATE DATABASE "ABC_Pharmacy" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "ABC_Pharmacy";
                postgres    false            �            1255    16590    getitemnamebyid(integer)    FUNCTION       CREATE FUNCTION public.getitemnamebyid(itemid integer) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
    DECLARE
        itemName VARCHAR(255);
    BEGIN
        SELECT Name INTO itemName FROM Items WHERE ID = itemID;
        RETURN itemName;
    END;
$$;
 6   DROP FUNCTION public.getitemnamebyid(itemid integer);
       public          postgres    false            �            1259    16736    invoices    TABLE     '  CREATE TABLE public.invoices (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    name character varying(255),
    mobile_no character varying(20),
    email character varying(255),
    address character varying(255),
    billing_type character varying(50),
    total_price numeric(10,2),
    description text,
    CONSTRAINT invoices_description_check CHECK ((length(description) <= 10485760))
);
    DROP TABLE public.invoices;
       public         heap    postgres    false            �            1259    16735    invoices_id_seq    SEQUENCE     �   CREATE SEQUENCE public.invoices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.invoices_id_seq;
       public          postgres    false    218            �           0    0    invoices_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.invoices_id_seq OWNED BY public.invoices.id;
          public          postgres    false    217            �            1259    16530    items    TABLE       CREATE TABLE public.items (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name text,
    unit_price numeric,
    unit_quantity integer,
    item_category text
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    16529    items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.items_id_seq;
       public          postgres    false    216            �           0    0    items_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;
          public          postgres    false    215            !           2604    16739    invoices id    DEFAULT     j   ALTER TABLE ONLY public.invoices ALTER COLUMN id SET DEFAULT nextval('public.invoices_id_seq'::regclass);
 :   ALTER TABLE public.invoices ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218                        2604    16533    items id    DEFAULT     d   ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);
 7   ALTER TABLE public.items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    16736    invoices 
   TABLE DATA           �   COPY public.invoices (id, created_at, updated_at, deleted_at, name, mobile_no, email, address, billing_type, total_price, description) FROM stdin;
    public          postgres    false    218   a       �          0    16530    items 
   TABLE DATA           w   COPY public.items (id, created_at, updated_at, deleted_at, name, unit_price, unit_quantity, item_category) FROM stdin;
    public          postgres    false    216   �       �           0    0    invoices_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.invoices_id_seq', 52, true);
          public          postgres    false    217            �           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 12, true);
          public          postgres    false    215            *           2606    16746    invoices invoices_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.invoices DROP CONSTRAINT invoices_pkey;
       public            postgres    false    218            '           2606    16537    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    216            (           1259    16747    idx_invoices_deleted_at    INDEX     R   CREATE INDEX idx_invoices_deleted_at ON public.invoices USING btree (deleted_at);
 +   DROP INDEX public.idx_invoices_deleted_at;
       public            postgres    false    218            %           1259    16538    idx_items_deleted_at    INDEX     L   CREATE INDEX idx_items_deleted_at ON public.items USING btree (deleted_at);
 (   DROP INDEX public.idx_items_deleted_at;
       public            postgres    false    216            �   �   x��ʱ�0F���)�+�_�
L&��Xn��%P����&g���RJ�f	잆+m^Z�s��;�>��PWT����������.��`�q�\�#�`�i�����he՞��` �2/S���:��pԪ6J���*5      �   �  x����n�0E��Wd_��<��ݴ@�]g�ش�đ�F_�a�8�*#A!.��ܹÑH�EZ .�,d���κL�?�s`�' )�m��k��3%�Ĕp��6�56xaF�\!`J��?�����k�N=t���n�`R�_d�xaA�c٘!J< ?	���v#�ƉV���i�fu�����h�l,H�m2�G���1��vz�&[e���@f��Pj��&D�.f��.�Vjr�f��M�dB��4�ʥΔԔ��<�gb H|��gG�0�f�N�%C�bx�s�Y}�9��aSzMJm$�v���Vv�lt�Ѕ1K�Ǳ�FD�~�п<����v�F�Z��Z��㪌pR%�Ll|���:!�fK�Ev'��K߭���NJ�h?�@$dn�/��_�O���u��&HT�ݮ��_�M�p�;�k�����Z�~v��+��R�²?ԛ:�J_�����     