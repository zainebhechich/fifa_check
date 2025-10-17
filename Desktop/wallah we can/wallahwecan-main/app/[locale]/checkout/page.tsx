"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Loader2, ShoppingCart, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../../../hooks/use-cart";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl"; // PHASE 1 i18n fix

import { cn } from "../../../lib/utils";

interface BillingForm {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
}

interface ShippingForm {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart, removeFromCart, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('Checkout.Main'); // PHASE 1 i18n fix
  const locale = useLocale(); // PHASE 1 i18n fix
  const isRtl = locale?.startsWith("ar");

  const numberLocale = useMemo(() => {
    if (!locale) return "fr-FR";
    if (locale.startsWith("ar")) return "ar-TN";
    if (locale.startsWith("en")) return "en-US";
    return "fr-FR";
  }, [locale]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(numberLocale, {
        style: "currency",
        currency: "TND",
        minimumFractionDigits: 2,
      }),
    [numberLocale],
  );

  const formatCurrency = useCallback(
    (value: number) => {
      const formatted = currencyFormatter.format(value);
      const localizedSymbol = locale?.startsWith("ar") ? "د.ت" : "DT";
  return formatted.replace(/TND/g, localizedSymbol);
    },
    [currencyFormatter, locale],
  );

  const fieldLabels: Record<keyof BillingForm, string> = useMemo(
    () => ({
      firstName: t('billing.firstName'),
      lastName: t('billing.lastName'),
      companyName: t('billing.companyName'),
      country: t('billing.country'),
      streetAddress: t('billing.streetAddress'),
      apartment: t('billing.apartment'),
      city: t('billing.city'),
      state: t('billing.state'),
      postcode: t('billing.postcode'),
      phone: t('billing.phone'),
      email: t('billing.email'),
    }),
    [t],
  );

  // Billing form state
  const [billingForm, setBillingForm] = useState<BillingForm>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Tunisia",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
  });

  // Shipping form state
  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Tunisia",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
  });

  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error(t('errors.cartEmpty')); // PHASE 1 i18n fix
      return;
    }

    // Validate required fields
    const requiredBillingFields: Array<keyof BillingForm> = [
      "firstName",
      "lastName",
      "streetAddress",
      "city",
      "state",
      "postcode",
      "phone",
      "email",
    ];
    for (const field of requiredBillingFields) {
      if (!billingForm[field]) {
        toast.error(t('errors.fieldMissing', { field: fieldLabels[field] })); // PHASE 1 i18n fix
        return;
      }
    }

    setIsLoading(true);

    try {
      // Save customer email to newsletter if not already subscribed
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: billingForm.email }),
        });
      } catch (error) {
        console.warn("Newsletter signup failed:", error);
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            product_id: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
          billing: billingForm,
          shipping: shipToDifferentAddress ? shippingForm : billingForm,
          customer: {
            email: billingForm.email,
            name: `${billingForm.firstName} ${billingForm.lastName}`.trim(),
            phoneNumber: billingForm.phone,
            address: `${billingForm.streetAddress}, ${billingForm.city}, ${billingForm.state} ${billingForm.postcode}`,
          },
        }),
      });

      const data = await response.json();
  if (!response.ok) throw new Error(data.error || t('errors.orderError'));

      clearCart();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.success(t('errors.orderCreated')); // PHASE 1 i18n fix
        router.push(`/${locale}/checkout/success`); // PHASE 1 i18n fix
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : t('errors.orderError')); // PHASE 1 i18n fix
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-neutral-900 dark:to-neutral-800">
        <WallahWeCanNavbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-gray-400" />
              <h1 className="text-2xl font-bold mb-4">{t('emptyCart.title')}{/* PHASE 1 i18n fix */}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('emptyCart.description')}{/* PHASE 1 i18n fix */}</p>
              <Button
                onClick={() => router.push(`/${locale}/shop`)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {t('emptyCart.continueShopping')}{/* PHASE 1 i18n fix */}
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const total = getTotalPrice();
  const shippingCost = 7.0; // Fixed shipping cost
  const tvaRate = 0.19; // 19% TVA
  const tvaAmount = total * tvaRate;
  const finalTotal = total + shippingCost + tvaAmount;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-neutral-900 dark:to-neutral-800"
    >
      <WallahWeCanNavbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">{t('title')}{/* PHASE 1 i18n fix */}</h1>

            {/* Shipping Info Banner */}
            <div
              className={cn(
                "bg-amber-100 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-lg p-4 mb-8 flex items-center gap-2",
                isRtl && "flex-row-reverse text-right"
              )}
            >
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-800 dark:text-amber-300 font-medium">
                {t('shippingInfo.label')}{/* PHASE 1 i18n fix */}
              </span>
              <span className="text-amber-700 dark:text-amber-300">{t('shippingInfo.onlyTunisia')}{/* PHASE 1 i18n fix */}</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Billing & Shipping */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Billing Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className={cn("text-xl font-semibold", isRtl && "text-right")}>{t('billing.title')}{/* PHASE 1 i18n fix */}</CardTitle>
                    </CardHeader>
                    <CardContent
                      className={cn("space-y-6", isRtl && "text-right")}
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">{t('billing.firstName')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="firstName"
                            value={billingForm.firstName}
                            onChange={(e) =>
                              setBillingForm({ ...billingForm, firstName: e.target.value })
                            }
                            placeholder={t('billing.firstName')}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">{t('billing.lastName')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="lastName"
                            value={billingForm.lastName}
                            onChange={(e) =>
                              setBillingForm({ ...billingForm, lastName: e.target.value })
                            }
                            placeholder={t('billing.lastName')}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="companyName">{t('billing.companyName')}</Label> {/* PHASE 1 i18n fix */}
                        <Input
                          id="companyName"
                          value={billingForm.companyName}
                          onChange={(e) =>
                            setBillingForm({ ...billingForm, companyName: e.target.value })
                          }
                          placeholder={t('billing.companyName')}
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">{t('billing.country')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Select
                          value={billingForm.country}
                          onValueChange={(value) =>
                            setBillingForm({ ...billingForm, country: value })
                          }
                        >
                          <SelectTrigger className={cn(isRtl && "justify-end text-right")}>
                            <SelectValue placeholder={t('billing.selectCountry')} />
                          </SelectTrigger>
                          <SelectContent dir={isRtl ? "rtl" : "ltr"}>
                            <SelectItem value="Tunisia">{t('countries.tunisia')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="streetAddress">{t('billing.streetAddress')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                        <Input
                          id="streetAddress"
                          value={billingForm.streetAddress}
                          onChange={(e) =>
                            setBillingForm({ ...billingForm, streetAddress: e.target.value })
                          }
                          placeholder={t('billing.streetAddress')}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="apartment">{t('billing.apartment')}</Label> {/* PHASE 1 i18n fix */}
                        <Input
                          id="apartment"
                          value={billingForm.apartment}
                          onChange={(e) =>
                            setBillingForm({ ...billingForm, apartment: e.target.value })
                          }
                          placeholder={t('billing.apartment')}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">{t('billing.city')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="city"
                            value={billingForm.city}
                            onChange={(e) =>
                              setBillingForm({ ...billingForm, city: e.target.value })
                            }
                            placeholder={t('billing.city')}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">{t('billing.state')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="state"
                            value={billingForm.state}
                            onChange={(e) =>
                              setBillingForm({ ...billingForm, state: e.target.value })
                            }
                            placeholder={t('billing.state')}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postcode">{t('billing.postcode')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="postcode"
                            value={billingForm.postcode}
                            onChange={(e) =>
                              setBillingForm({ ...billingForm, postcode: e.target.value })
                            }
                            placeholder={t('billing.postcode')}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">{t('billing.phone')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="phone"
                            type="tel"
                            value={billingForm.phone}
                            onChange={(e) =>
                              setBillingForm({ ...billingForm, phone: e.target.value })
                            }
                            placeholder={t('billing.phone')}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t('billing.email')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="email"
                            type="email"
                            value={billingForm.email}
                            onChange={(e) =>
                              setBillingForm({ ...billingForm, email: e.target.value })
                            }
                            placeholder={t('billing.email')}
                            required
                          />
                        </div>
                      </div>

                      <div
                        className={cn(
                          "flex items-center gap-2",
                          isRtl && "flex-row-reverse text-right"
                        )}
                      >
                        <Checkbox
                          id="shipToDifferent"
                          checked={shipToDifferentAddress}
                          onCheckedChange={(checked) => setShipToDifferentAddress(!!checked)}
                        />
                        <Label
                          htmlFor="shipToDifferent"
                          className={cn(
                            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                            isRtl && "text-right"
                          )}
                        >
                          {t('shipToDifferent')}
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Details (if different address) */}
                  {shipToDifferentAddress && (
                    <Card>
                      <CardHeader>
                        <CardTitle className={cn("text-xl font-semibold", isRtl && "text-right")}>{t('shipping.title')}</CardTitle> {/* PHASE 1 i18n fix */}
                      </CardHeader>
                      <CardContent
                        className={cn("space-y-6", isRtl && "text-right")}
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="shippingFirstName">{t('shipping.firstName')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                            <Input
                              id="shippingFirstName"
                              value={shippingForm.firstName}
                              onChange={(e) =>
                                setShippingForm({ ...shippingForm, firstName: e.target.value })
                              }
                              placeholder={t('shipping.firstName')}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="shippingLastName">{t('shipping.lastName')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                            <Input
                              id="shippingLastName"
                              value={shippingForm.lastName}
                              onChange={(e) =>
                                setShippingForm({ ...shippingForm, lastName: e.target.value })
                              }
                              placeholder={t('shipping.lastName')}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="shippingCompany">{t('shipping.companyName')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="shippingCompany"
                            value={shippingForm.companyName}
                            onChange={(e) =>
                              setShippingForm({ ...shippingForm, companyName: e.target.value })
                            }
                            placeholder={t('shipping.companyName')}
                          />
                        </div>

                        <div>
                          <Label htmlFor="shippingCountry">{t('shipping.country')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Select
                            value={shippingForm.country}
                            onValueChange={(value) =>
                              setShippingForm({ ...shippingForm, country: value })
                            }
                          >
                            <SelectTrigger className={cn(isRtl && "justify-end text-right")}>
                              <SelectValue placeholder={t('shipping.selectCountry')} />
                            </SelectTrigger>
                            <SelectContent dir={isRtl ? "rtl" : "ltr"}>
                              <SelectItem value="Tunisia">{t('countries.tunisia')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="shippingStreetAddress">{t('shipping.streetAddress')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="shippingStreetAddress"
                            value={shippingForm.streetAddress}
                            onChange={(e) =>
                              setShippingForm({ ...shippingForm, streetAddress: e.target.value })
                            }
                            placeholder={t('shipping.streetAddress')}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="shippingApartment">{t('shipping.apartment')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="shippingApartment"
                            value={shippingForm.apartment}
                            onChange={(e) =>
                              setShippingForm({ ...shippingForm, apartment: e.target.value })
                            }
                            placeholder={t('shipping.apartment')}
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="shippingCity">{t('shipping.city')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                            <Input
                              id="shippingCity"
                              value={shippingForm.city}
                              onChange={(e) =>
                                setShippingForm({ ...shippingForm, city: e.target.value })
                              }
                              placeholder={t('shipping.city')}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="shippingState">{t('shipping.state')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                            <Input
                              id="shippingState"
                              value={shippingForm.state}
                              onChange={(e) =>
                                setShippingForm({ ...shippingForm, state: e.target.value })
                              }
                              placeholder={t('shipping.state')}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="shippingPostcode">{t('shipping.postcode')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                            <Input
                              id="shippingPostcode"
                              value={shippingForm.postcode}
                              onChange={(e) =>
                                setShippingForm({ ...shippingForm, postcode: e.target.value })
                              }
                              placeholder={t('shipping.postcode')}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="shippingPhone">{t('shipping.phone')} {t('billing.required')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="shippingPhone"
                            type="tel"
                            value={shippingForm.phone}
                            onChange={(e) =>
                              setShippingForm({ ...shippingForm, phone: e.target.value })
                            }
                            placeholder={t('shipping.phone')}
                            required
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - Order Summary */}
                <div className="space-y-6">
                  {/* Review your orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle className={cn("text-xl font-semibold", isRtl && "text-right")}>{t('review.title')}{/* PHASE 1 i18n fix */}</CardTitle>
                    </CardHeader>
                    <CardContent className={cn(isRtl && "text-right")}>
                      <div className="space-y-4">
                        {/* Order Items */}
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={cn(
                              "flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0",
                              isRtl && "flex-row-reverse"
                            )}
                          >
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className={cn("flex-1 min-w-0", isRtl && "text-right")}
                            >
                              <h4 className="font-medium text-sm truncate">{item.name}</h4>
                              <div
                                className={cn(
                                  "flex items-center gap-2 mt-1",
                                  isRtl && "flex-row-reverse"
                                )}
                              >
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() =>
                                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                  }
                                >
                                  -
                                </Button>
                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className={cn("text-right", isRtl && "text-left")}
                            >
                              <p className="font-semibold text-sm">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {/* Order Totals */}
                        <div className="space-y-2 pt-4">
                          <div
                            className={cn(
                              "flex justify-between text-sm",
                              isRtl && "flex-row-reverse"
                            )}
                          >
                            <span>{t('review.subtotal')}{/* PHASE 1 i18n fix */}</span>
                            <span>{formatCurrency(total)}</span>
                          </div>
                          <div
                            className={cn(
                              "flex justify-between text-sm",
                              isRtl && "flex-row-reverse"
                            )}
                          >
                            <span>{t('review.shipping')}{/* PHASE 1 i18n fix */}</span>
                            <span>{formatCurrency(shippingCost)}</span>
                          </div>
                          <div className={cn("text-xs text-gray-600 dark:text-gray-400", isRtl && "text-right")}>
                            {t('review.shippingNote')}{/* PHASE 1 i18n fix */}
                          </div>
                          <div
                            className={cn(
                              "flex justify-between text-sm",
                              isRtl && "flex-row-reverse"
                            )}
                          >
                            <span>{t('review.tva')}{/* PHASE 1 i18n fix */}</span>
                            <span>{formatCurrency(tvaAmount)}</span>
                          </div>
                          <Separator />
                          <div
                            className={cn(
                              "flex justify-between text-lg font-bold",
                              isRtl && "flex-row-reverse"
                            )}
                          >
                            <span>{t('review.total')}{/* PHASE 1 i18n fix */}</span>
                            <span className="text-orange-600 dark:text-orange-400">
                              {formatCurrency(finalTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle className={cn("text-xl font-semibold", isRtl && "text-right")}>{t('payments.title')}{/* PHASE 1 i18n fix */}</CardTitle>
                    </CardHeader>
                    <CardContent className={cn(isRtl && "text-right")}>
                      <div className="space-y-4">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div
                            className={cn(
                              "flex items-center gap-2 mb-2",
                              isRtl && "flex-row-reverse"
                            )}
                          >
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            <span className="font-medium">{t('payments.online')}{/* PHASE 1 i18n fix */}</span>
                          </div>
                          <p className={cn("text-sm text-gray-600 dark:text-gray-400", isRtl ? "mr-5" : "ml-5")}>
                            {t('payments.onlineHint')}{/* PHASE 1 i18n fix */}
                          </p>
                        </div>
                        <div className={cn("text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg", isRtl && "text-right")}>
                          {t('payments.privacy')}{/* PHASE 1 i18n fix */}
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading || items.length === 0}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold"
                          size="lg"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className={cn("h-5 w-5 animate-spin", isRtl ? "ml-2" : "mr-2")} />
                              {t('payments.processing')}{/* PHASE 1 i18n fix */}
                            </>
                          ) : (
                            t('payments.placeOrder', { amount: formatCurrency(finalTotal) })
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
