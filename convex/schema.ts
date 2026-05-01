import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const orderMode = v.union(v.literal("delivery"), v.literal("dineIn"));
const orderStatus = v.union(
  v.literal("placed"),
  v.literal("cooking"),
  v.literal("outForDelivery"),
  v.literal("ready"),
  v.literal("delivered"),
);
const imageUrls = v.array(v.string());
const customerSnapshot = v.object({
  name: v.string(),
  phone: v.string(),
  address: v.union(v.string(), v.null()),
});

export default defineSchema({
  categories: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    sortOrder: v.number(),
    isActive: v.boolean(),
    isArchived: v.boolean(),
    updatedAt: v.number(),
  })
    .index("by_isActive_and_isArchived_and_sortOrder", [
      "isActive",
      "isArchived",
      "sortOrder",
    ])
    .index("by_isArchived_and_sortOrder", ["isArchived", "sortOrder"])
    .index("by_sortOrder", ["sortOrder"]),

  menuItems: defineTable({
    categoryId: v.id("categories"),
    name: v.string(),
    description: v.string(),
    pricePaise: v.number(),
    packagingChargePaise: v.number(),
    imageUrls,
    orderMode,
    isAvailable: v.boolean(),
    isArchived: v.boolean(),
    sortOrder: v.number(),
    updatedAt: v.number(),
  })
    .index("by_isAvailable_isArchived_sortOrder", [
      "isAvailable",
      "isArchived",
      "sortOrder",
    ])
    .index("by_isAvailable_isArchived_orderMode_sortOrder", [
      "isAvailable",
      "isArchived",
      "orderMode",
      "sortOrder",
    ])
    .index("by_categoryId_isAvailable_isArchived_sortOrder", [
      "categoryId",
      "isAvailable",
      "isArchived",
      "sortOrder",
    ])
    .index(
      "by_categoryId_isAvailable_isArchived_orderMode_sortOrder",
      ["categoryId", "isAvailable", "isArchived", "orderMode", "sortOrder"],
    )
    .index("by_isArchived_and_sortOrder", ["isArchived", "sortOrder"])
    .index("by_categoryId_and_isArchived_and_sortOrder", [
      "categoryId",
      "isArchived",
      "sortOrder",
    ])
    .index("by_categoryId_and_sortOrder", ["categoryId", "sortOrder"])
    .index("by_sortOrder", ["sortOrder"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["isAvailable", "isArchived", "orderMode"],
    }),

  customerProfiles: defineTable({
    deviceSessionId: v.string(),
    name: v.string(),
    phone: v.string(),
    address: v.union(v.string(), v.null()),
    lastOrderAt: v.number(),
  }).index("by_deviceSessionId_and_phone", ["deviceSessionId", "phone"]),

  orders: defineTable({
    customerId: v.id("customerProfiles"),
    deviceSessionId: v.string(),
    customerPhone: v.string(),
    customerSnapshot,
    orderMode,
    status: orderStatus,
    serviceDate: v.string(),
    subtotalPaise: v.number(),
    packagingTotalPaise: v.number(),
    totalPaise: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    deliveredAt: v.union(v.number(), v.null()),
  })
    .index("by_serviceDate_and_createdAt", ["serviceDate", "createdAt"])
    .index("by_serviceDate_and_status_and_createdAt", [
      "serviceDate",
      "status",
      "createdAt",
    ])
    .index("by_deviceSessionId_and_customerPhone_and_createdAt", [
      "deviceSessionId",
      "customerPhone",
      "createdAt",
    ])
    .index("by_customerId_and_createdAt", ["customerId", "createdAt"]),

  orderItems: defineTable({
    orderId: v.id("orders"),
    menuItemId: v.id("menuItems"),
    categoryId: v.id("categories"),
    categoryName: v.string(),
    itemName: v.string(),
    itemDescription: v.string(),
    itemImageUrls: imageUrls,
    orderMode,
    quantity: v.number(),
    unitPricePaise: v.number(),
    packagingChargePaise: v.number(),
    lineSubtotalPaise: v.number(),
    linePackagingPaise: v.number(),
  }).index("by_orderId", ["orderId"]),
});
