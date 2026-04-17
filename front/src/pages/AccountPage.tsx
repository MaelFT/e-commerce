import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
    Package,
    Settings,
    User as UserIcon,
    LogOut,
    ShieldCheck,
    CheckCircle,
    ChevronRight,
    Loader2,
    MapPin,
    Trash2,
    TriangleAlert,
} from "lucide-react";
import PublicLayout from "../components/PublicLayout";
import { ordersApi } from "../api/orders";
import type { ValidationErrors, Order } from "../types";
import { useAddressApi, addressFromUser, isAddressEmpty, type SavedAddress } from "../hooks/useAddress";
import client from "../api/client";

type Tab = "profile" | "orders" | "addresses" | "settings";

interface ProfileForm {
    name: string;
    email: string;
    current_password: string;
    password: string;
    password_confirmation: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    pending: {
        label: "En attente",
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    paid: {
        label: "Payée",
        color: "bg-green-50 text-green-700 border-green-200",
    },
    failed: {
        label: "Échouée",
        color: "bg-red-50 text-red-700 border-red-200",
    },
};

export default function AccountPage() {
    const { user, logout, clearSession, updateProfile, refreshUser } = useAuth();
    const { itemCount } = useCart();
    const { save: saveAddressApi, clear: clearAddressApi } = useAddressApi();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const tabFromUrl = searchParams.get("tab") as Tab | null;
    const [activeTab, setActiveTab] = useState<Tab>(
        tabFromUrl && ["profile", "orders", "addresses", "settings"].includes(tabFromUrl)
            ? tabFromUrl
            : "profile",
    );
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [form, setForm] = useState<ProfileForm>({
        name: user?.name ?? "",
        email: user?.email ?? "",
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [addrForm, setAddrForm] = useState<SavedAddress>(() => addressFromUser(user ?? null));
    const [addrSuccess, setAddrSuccess] = useState(false);
    const [addrLoading, setAddrLoading] = useState(false);
    const [addrError,   setAddrError]   = useState<string | null>(null);

    const [deletePassword,  setDeletePassword]  = useState('');
    const [deleteLoading,   setDeleteLoading]   = useState(false);
    const [deleteError,     setDeleteError]     = useState<string | null>(null);
    const [deleteConfirm,   setDeleteConfirm]   = useState(false);

    useEffect(() => {
        setOrdersLoading(true);
        ordersApi
            .list()
            .then((res) => setOrders(res.data))
            .catch(() => {})
            .finally(() => setOrdersLoading(false));
    }, []);

    const paidOrders = orders.filter((o) => o.status === "paid").length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    const stats = [
        { label: "Commandes", value: String(orders.length), sub: "Total" },
        { label: "En attente", value: String(pendingOrders), sub: "À traiter" },
        { label: "Payées", value: String(paidOrders), sub: "Terminées" },
        { label: "Panier", value: String(itemCount), sub: "Articles" },
    ];

    const handleLogout = async (): Promise<void> => {
        await logout();
        navigate("/login");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setSuccess(false);
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        setSuccess(false);

        const payload: Partial<ProfileForm> = {};
        if (form.name !== user?.name) payload.name = form.name;
        if (form.email !== user?.email) payload.email = form.email;
        if (form.password) {
            payload.current_password = form.current_password;
            payload.password = form.password;
            payload.password_confirmation = form.password_confirmation;
        }

        try {
            await updateProfile(payload);
            setSuccess(true);
            setForm((prev) => ({
                ...prev,
                current_password: "",
                password: "",
                password_confirmation: "",
            }));
        } catch (err: unknown) {
            const apiErr = err as {
                errors?: ValidationErrors;
                message?: string;
            };
            setErrors(
                apiErr.errors ?? {
                    name: [apiErr.message ?? "Une erreur est survenue."],
                },
            );
        } finally {
            setLoading(false);
        }
    };

    const initials =
        user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) ?? "?";

    const navItems: { id: Tab; icon: typeof UserIcon; label: string }[] = [
        { id: "profile",   icon: UserIcon, label: "Mon compte" },
        { id: "orders",    icon: Package,  label: "Mes commandes" },
        { id: "addresses", icon: MapPin,   label: "Adresses" },
        { id: "settings",  icon: Settings, label: "Paramètres" },
    ];

    return (
        <PublicLayout>
            <div className="flex-grow bg-[#FDFDFD] py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-8">
                        <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-1">
                            Espace personnel
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-black">
                            Bonjour, {user?.name?.split(" ")[0]}
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-1">
                                {/* Avatar */}
                                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-sm font-bold shrink-0">
                                        {initials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-black truncate">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-zinc-400 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-100 pt-2 space-y-1">
                                    {navItems.map(
                                        ({ id, icon: Icon, label }) => (
                                            <button
                                                key={id}
                                                onClick={() => setActiveTab(id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                                    activeTab === id
                                                        ? "bg-black text-white"
                                                        : "text-zinc-500 hover:text-black hover:bg-zinc-50"
                                                }`}
                                            >
                                                <Icon className="w-4 h-4 shrink-0" />
                                                {label}
                                            </button>
                                        ),
                                    )}
                                </div>

                                <div className="pt-2 border-t border-zinc-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 shrink-0" />
                                        Déconnexion
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* Contenu */}
                        <main className="flex-1 space-y-6">
                            {activeTab === "profile" && (
                                <>
                                    {/* Stats */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {stats.map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="bg-white border border-zinc-200 rounded-2xl p-5 hover:border-zinc-300 transition-colors"
                                            >
                                                <p className="text-3xl font-black text-black mb-1">
                                                    {stat.value}
                                                </p>
                                                <p className="text-sm font-medium text-zinc-700">
                                                    {stat.label}
                                                </p>
                                                <p className="text-xs text-zinc-400 mt-0.5">
                                                    {stat.sub}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Formulaire édition */}
                                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8">
                                        <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-6">
                                            Informations personnelles
                                        </h2>

                                        {success && (
                                            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6">
                                                <CheckCircle className="w-4 h-4 shrink-0" />
                                                Profil mis à jour avec succès.
                                            </div>
                                        )}

                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                        >
                                            {/* Nom */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                    Nom complet
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors.name[0]}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                    Adresse e-mail
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors.email[0]}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Séparateur mot de passe */}
                                            <div className="border-t border-zinc-100 pt-5">
                                                <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">
                                                    Changer le mot de passe{" "}
                                                    <span className="normal-case font-normal">
                                                        (optionnel)
                                                    </span>
                                                </p>

                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                            Mot de passe actuel
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="current_password"
                                                            value={
                                                                form.current_password
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="••••••••"
                                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                        />
                                                        {errors.current_password && (
                                                            <p className="text-red-500 text-xs">
                                                                {
                                                                    errors
                                                                        .current_password[0]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                                Nouveau mot de
                                                                passe
                                                            </label>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                value={
                                                                    form.password
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                placeholder="••••••••"
                                                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                            />
                                                            {errors.password && (
                                                                <p className="text-red-500 text-xs">
                                                                    {
                                                                        errors
                                                                            .password[0]
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                                Confirmation
                                                            </label>
                                                            <input
                                                                type="password"
                                                                name="password_confirmation"
                                                                value={
                                                                    form.password_confirmation
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                placeholder="••••••••"
                                                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="px-8 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    {loading
                                                        ? "Enregistrement…"
                                                        : "Sauvegarder"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Panneau admin */}
                                    {user?.role === "admin" && (
                                        <a
                                            href="http://localhost:8000/admin"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-4 bg-white border border-zinc-200 rounded-2xl p-6 hover:border-zinc-300 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                                                <ShieldCheck className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-black">
                                                    Panneau d'administration
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    Accéder au back-office
                                                    Filament
                                                </p>
                                            </div>
                                            <span className="text-xs font-medium text-zinc-400 group-hover:text-black transition-colors">
                                                Ouvrir →
                                            </span>
                                        </a>
                                    )}
                                </>
                            )}

                            {activeTab === "orders" && (
                                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
                                    <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                                        <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                            Mes commandes
                                        </h2>
                                        <span className="text-xs text-zinc-400">
                                            {orders.length} commande
                                            {orders.length > 1 ? "s" : ""}
                                        </span>
                                    </div>

                                    {ordersLoading ? (
                                        <div className="flex items-center justify-center py-16">
                                            <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                                            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                                                <Package className="w-8 h-8 text-zinc-300" />
                                            </div>
                                            <p className="text-base font-semibold text-zinc-700 mb-1">
                                                Aucune commande
                                            </p>
                                            <p className="text-sm text-zinc-400 mb-6">
                                                Vous n'avez pas encore passé de
                                                commande.
                                            </p>
                                            <Link
                                                to="/products"
                                                className="px-6 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors"
                                            >
                                                Découvrir nos produits
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-zinc-100">
                                            {orders.map((order) => {
                                                const statusInfo =
                                                    STATUS_LABELS[
                                                        order.status
                                                    ] ?? {
                                                        label: order.status,
                                                        color: "bg-zinc-50 text-zinc-600 border-zinc-200",
                                                    };
                                                const date = new Date(
                                                    order.created_at,
                                                ).toLocaleDateString("fr-FR", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                });
                                                return (
                                                    <Link
                                                        key={order.id}
                                                        to={`/orders/${order.id}`}
                                                        className="flex items-center gap-4 px-6 py-5 hover:bg-zinc-50 transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                                                            <Package className="w-5 h-5 text-zinc-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <p className="text-sm font-semibold text-black">
                                                                    {
                                                                        order.order_number
                                                                    }
                                                                </p>
                                                                <span
                                                                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${statusInfo.color}`}
                                                                >
                                                                    {
                                                                        statusInfo.label
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-xs text-zinc-400">
                                                                <span>
                                                                    {date}
                                                                </span>
                                                                <span>·</span>
                                                                <span>
                                                                    {
                                                                        order
                                                                            .items
                                                                            .length
                                                                    }{" "}
                                                                    article
                                                                    {order.items
                                                                        .length >
                                                                    1
                                                                        ? "s"
                                                                        : ""}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <p className="text-sm font-semibold text-black">
                                                                {(
                                                                    order.total /
                                                                    100
                                                                ).toFixed(
                                                                    2,
                                                                )}{" "}
                                                                €
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0" />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "addresses" && (
                                <div className="space-y-6">
                                    {/* Adresse de livraison */}
                                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                                                <MapPin className="w-4 h-4 text-black" />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-semibold text-black">
                                                    Adresse de livraison
                                                </h2>
                                                <p className="text-xs text-zinc-400 mt-0.5">
                                                    Pré-remplie automatiquement lors du paiement
                                                </p>
                                            </div>
                                        </div>

                                        {addrSuccess && (
                                            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6">
                                                <CheckCircle className="w-4 h-4 shrink-0" />
                                                Adresse sauvegardée avec succès.
                                            </div>
                                        )}

                                        {addrError && (
                                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 mb-6">
                                                {addrError}
                                            </div>
                                        )}

                                        <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                setAddrLoading(true);
                                                setAddrError(null);
                                                try {
                                                    const updatedUser = await saveAddressApi(addrForm);
                                                    await refreshUser?.();
                                                    setAddrForm(addressFromUser(updatedUser));
                                                    setAddrSuccess(true);
                                                    setTimeout(() => setAddrSuccess(false), 3000);
                                                } catch {
                                                    setAddrError("Une erreur est survenue. Veuillez réessayer.");
                                                } finally {
                                                    setAddrLoading(false);
                                                }
                                            }}
                                            className="space-y-4"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                    Adresse
                                                </label>
                                                <input
                                                    type="text"
                                                    value={addrForm.address}
                                                    onChange={(e) => setAddrForm(p => ({ ...p, address: e.target.value }))}
                                                    placeholder="12 rue de la Paix"
                                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                        Code postal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={addrForm.postal_code}
                                                        onChange={(e) => setAddrForm(p => ({ ...p, postal_code: e.target.value }))}
                                                        placeholder="75001"
                                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                        Ville
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={addrForm.city}
                                                        onChange={(e) => setAddrForm(p => ({ ...p, city: e.target.value }))}
                                                        placeholder="Paris"
                                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                                    <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                        Pays
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={addrForm.country}
                                                        onChange={(e) => setAddrForm(p => ({ ...p, country: e.target.value }))}
                                                        placeholder="France"
                                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold tracking-wider text-black uppercase">
                                                    Téléphone
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={addrForm.phone}
                                                    onChange={(e) => setAddrForm(p => ({ ...p, phone: e.target.value }))}
                                                    placeholder="+33 6 00 00 00 00"
                                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                {!isAddressEmpty(addrForm) && (
                                                    <button
                                                        type="button"
                                                        onClick={async () => {
                                                            setAddrLoading(true);
                                                            setAddrError(null);
                                                            try {
                                                                const updatedUser = await clearAddressApi();
                                                                await refreshUser?.();
                                                                setAddrForm(addressFromUser(updatedUser));
                                                                setAddrSuccess(false);
                                                            } catch {
                                                                setAddrError("Erreur lors de la suppression.");
                                                            } finally {
                                                                setAddrLoading(false);
                                                            }
                                                        }}
                                                        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Supprimer l'adresse
                                                    </button>
                                                )}
                                                <div className="ml-auto">
                                                    <button
                                                        type="submit"
                                                        disabled={addrLoading}
                                                        className="px-8 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                    >
                                                        {addrLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                                        Sauvegarder
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {activeTab === "settings" && (
                                <div className="space-y-6">
                                    {/* Zone de danger */}
                                    <div className="bg-white border border-red-200 rounded-2xl p-6 sm:p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                                <TriangleAlert className="w-4 h-4 text-red-500" />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-semibold text-black">
                                                    Zone de danger
                                                </h2>
                                                <p className="text-xs text-zinc-400 mt-0.5">
                                                    Actions irréversibles sur votre compte
                                                </p>
                                            </div>
                                        </div>

                                        {!deleteConfirm ? (
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-red-50 border border-red-200 rounded-xl">
                                                <div>
                                                    <p className="text-sm font-semibold text-black">
                                                        Supprimer mon compte
                                                    </p>
                                                    <p className="text-xs text-zinc-500 mt-0.5">
                                                        Toutes vos données seront définitivement effacées.
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setDeleteConfirm(true)}
                                                    className="shrink-0 px-5 py-2.5 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
                                                >
                                                    Supprimer le compte
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="p-5 bg-red-50 border border-red-200 rounded-xl space-y-4">
                                                <p className="text-sm text-zinc-700">
                                                    Pour confirmer, saisissez votre mot de passe actuel.
                                                    Cette action est <strong>irréversible</strong>.
                                                </p>

                                                {deleteError && (
                                                    <div className="p-3 bg-white border border-red-300 rounded-lg text-sm text-red-600">
                                                        {deleteError}
                                                    </div>
                                                )}

                                                <input
                                                    type="password"
                                                    value={deletePassword}
                                                    onChange={(e) => setDeletePassword(e.target.value)}
                                                    placeholder="Mot de passe actuel"
                                                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm transition-colors"
                                                />

                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setDeleteConfirm(false);
                                                            setDeletePassword('');
                                                            setDeleteError(null);
                                                        }}
                                                        className="flex-1 py-2.5 border border-zinc-300 text-sm font-medium rounded-xl hover:bg-zinc-50 transition-colors"
                                                    >
                                                        Annuler
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={deleteLoading || !deletePassword}
                                                        onClick={async () => {
                                                            setDeleteLoading(true);
                                                            setDeleteError(null);
                                                            try {
                                                                await client.delete('/auth/account', {
                                                                    data: { password: deletePassword },
                                                                });
                                                                // Le compte est supprimé → ne pas rappeler l'API logout
                                                                // (le token est déjà révoqué côté serveur)
                                                                clearSession();
                                                                navigate('/');
                                                            } catch (err: any) {
                                                                setDeleteError(
                                                                    err?.message ?? 'Une erreur est survenue.'
                                                                );
                                                            } finally {
                                                                setDeleteLoading(false);
                                                            }
                                                        }}
                                                        className="flex-1 py-2.5 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                    >
                                                        {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                                        Confirmer la suppression
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
