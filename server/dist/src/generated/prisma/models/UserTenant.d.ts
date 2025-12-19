import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserTenantModel = runtime.Types.Result.DefaultSelection<Prisma.$UserTenantPayload>;
export type AggregateUserTenant = {
    _count: UserTenantCountAggregateOutputType | null;
    _min: UserTenantMinAggregateOutputType | null;
    _max: UserTenantMaxAggregateOutputType | null;
};
export type UserTenantMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tenantId: string | null;
    role: string | null;
};
export type UserTenantMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tenantId: string | null;
    role: string | null;
};
export type UserTenantCountAggregateOutputType = {
    id: number;
    userId: number;
    tenantId: number;
    role: number;
    _all: number;
};
export type UserTenantMinAggregateInputType = {
    id?: true;
    userId?: true;
    tenantId?: true;
    role?: true;
};
export type UserTenantMaxAggregateInputType = {
    id?: true;
    userId?: true;
    tenantId?: true;
    role?: true;
};
export type UserTenantCountAggregateInputType = {
    id?: true;
    userId?: true;
    tenantId?: true;
    role?: true;
    _all?: true;
};
export type UserTenantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserTenantWhereInput;
    orderBy?: Prisma.UserTenantOrderByWithRelationInput | Prisma.UserTenantOrderByWithRelationInput[];
    cursor?: Prisma.UserTenantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserTenantCountAggregateInputType;
    _min?: UserTenantMinAggregateInputType;
    _max?: UserTenantMaxAggregateInputType;
};
export type GetUserTenantAggregateType<T extends UserTenantAggregateArgs> = {
    [P in keyof T & keyof AggregateUserTenant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserTenant[P]> : Prisma.GetScalarType<T[P], AggregateUserTenant[P]>;
};
export type UserTenantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserTenantWhereInput;
    orderBy?: Prisma.UserTenantOrderByWithAggregationInput | Prisma.UserTenantOrderByWithAggregationInput[];
    by: Prisma.UserTenantScalarFieldEnum[] | Prisma.UserTenantScalarFieldEnum;
    having?: Prisma.UserTenantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserTenantCountAggregateInputType | true;
    _min?: UserTenantMinAggregateInputType;
    _max?: UserTenantMaxAggregateInputType;
};
export type UserTenantGroupByOutputType = {
    id: string;
    userId: string;
    tenantId: string;
    role: string;
    _count: UserTenantCountAggregateOutputType | null;
    _min: UserTenantMinAggregateOutputType | null;
    _max: UserTenantMaxAggregateOutputType | null;
};
type GetUserTenantGroupByPayload<T extends UserTenantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserTenantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserTenantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserTenantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserTenantGroupByOutputType[P]>;
}>>;
export type UserTenantWhereInput = {
    AND?: Prisma.UserTenantWhereInput | Prisma.UserTenantWhereInput[];
    OR?: Prisma.UserTenantWhereInput[];
    NOT?: Prisma.UserTenantWhereInput | Prisma.UserTenantWhereInput[];
    id?: Prisma.StringFilter<"UserTenant"> | string;
    userId?: Prisma.StringFilter<"UserTenant"> | string;
    tenantId?: Prisma.StringFilter<"UserTenant"> | string;
    role?: Prisma.StringFilter<"UserTenant"> | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserTenantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserTenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_tenantId?: Prisma.UserTenantUserIdTenantIdCompoundUniqueInput;
    AND?: Prisma.UserTenantWhereInput | Prisma.UserTenantWhereInput[];
    OR?: Prisma.UserTenantWhereInput[];
    NOT?: Prisma.UserTenantWhereInput | Prisma.UserTenantWhereInput[];
    userId?: Prisma.StringFilter<"UserTenant"> | string;
    tenantId?: Prisma.StringFilter<"UserTenant"> | string;
    role?: Prisma.StringFilter<"UserTenant"> | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_tenantId">;
export type UserTenantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    _count?: Prisma.UserTenantCountOrderByAggregateInput;
    _max?: Prisma.UserTenantMaxOrderByAggregateInput;
    _min?: Prisma.UserTenantMinOrderByAggregateInput;
};
export type UserTenantScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserTenantScalarWhereWithAggregatesInput | Prisma.UserTenantScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserTenantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserTenantScalarWhereWithAggregatesInput | Prisma.UserTenantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserTenant"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserTenant"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"UserTenant"> | string;
    role?: Prisma.StringWithAggregatesFilter<"UserTenant"> | string;
};
export type UserTenantCreateInput = {
    id?: string;
    role?: string;
    tenant: Prisma.TenantCreateNestedOneWithoutUsersInput;
    user: Prisma.UserCreateNestedOneWithoutTenantsInput;
};
export type UserTenantUncheckedCreateInput = {
    id?: string;
    userId: string;
    tenantId: string;
    role?: string;
};
export type UserTenantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutUsersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutTenantsNestedInput;
};
export type UserTenantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserTenantCreateManyInput = {
    id?: string;
    userId: string;
    tenantId: string;
    role?: string;
};
export type UserTenantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserTenantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserTenantListRelationFilter = {
    every?: Prisma.UserTenantWhereInput;
    some?: Prisma.UserTenantWhereInput;
    none?: Prisma.UserTenantWhereInput;
};
export type UserTenantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserTenantUserIdTenantIdCompoundUniqueInput = {
    userId: string;
    tenantId: string;
};
export type UserTenantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
};
export type UserTenantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
};
export type UserTenantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
};
export type UserTenantCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutUserInput, Prisma.UserTenantUncheckedCreateWithoutUserInput> | Prisma.UserTenantCreateWithoutUserInput[] | Prisma.UserTenantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutUserInput | Prisma.UserTenantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserTenantCreateManyUserInputEnvelope;
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
};
export type UserTenantUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutUserInput, Prisma.UserTenantUncheckedCreateWithoutUserInput> | Prisma.UserTenantCreateWithoutUserInput[] | Prisma.UserTenantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutUserInput | Prisma.UserTenantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserTenantCreateManyUserInputEnvelope;
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
};
export type UserTenantUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutUserInput, Prisma.UserTenantUncheckedCreateWithoutUserInput> | Prisma.UserTenantCreateWithoutUserInput[] | Prisma.UserTenantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutUserInput | Prisma.UserTenantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserTenantUpsertWithWhereUniqueWithoutUserInput | Prisma.UserTenantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserTenantCreateManyUserInputEnvelope;
    set?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    disconnect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    delete?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    update?: Prisma.UserTenantUpdateWithWhereUniqueWithoutUserInput | Prisma.UserTenantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserTenantUpdateManyWithWhereWithoutUserInput | Prisma.UserTenantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserTenantScalarWhereInput | Prisma.UserTenantScalarWhereInput[];
};
export type UserTenantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutUserInput, Prisma.UserTenantUncheckedCreateWithoutUserInput> | Prisma.UserTenantCreateWithoutUserInput[] | Prisma.UserTenantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutUserInput | Prisma.UserTenantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserTenantUpsertWithWhereUniqueWithoutUserInput | Prisma.UserTenantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserTenantCreateManyUserInputEnvelope;
    set?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    disconnect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    delete?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    update?: Prisma.UserTenantUpdateWithWhereUniqueWithoutUserInput | Prisma.UserTenantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserTenantUpdateManyWithWhereWithoutUserInput | Prisma.UserTenantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserTenantScalarWhereInput | Prisma.UserTenantScalarWhereInput[];
};
export type UserTenantCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutTenantInput, Prisma.UserTenantUncheckedCreateWithoutTenantInput> | Prisma.UserTenantCreateWithoutTenantInput[] | Prisma.UserTenantUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutTenantInput | Prisma.UserTenantCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.UserTenantCreateManyTenantInputEnvelope;
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
};
export type UserTenantUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutTenantInput, Prisma.UserTenantUncheckedCreateWithoutTenantInput> | Prisma.UserTenantCreateWithoutTenantInput[] | Prisma.UserTenantUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutTenantInput | Prisma.UserTenantCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.UserTenantCreateManyTenantInputEnvelope;
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
};
export type UserTenantUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutTenantInput, Prisma.UserTenantUncheckedCreateWithoutTenantInput> | Prisma.UserTenantCreateWithoutTenantInput[] | Prisma.UserTenantUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutTenantInput | Prisma.UserTenantCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.UserTenantUpsertWithWhereUniqueWithoutTenantInput | Prisma.UserTenantUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.UserTenantCreateManyTenantInputEnvelope;
    set?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    disconnect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    delete?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    update?: Prisma.UserTenantUpdateWithWhereUniqueWithoutTenantInput | Prisma.UserTenantUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.UserTenantUpdateManyWithWhereWithoutTenantInput | Prisma.UserTenantUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.UserTenantScalarWhereInput | Prisma.UserTenantScalarWhereInput[];
};
export type UserTenantUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.UserTenantCreateWithoutTenantInput, Prisma.UserTenantUncheckedCreateWithoutTenantInput> | Prisma.UserTenantCreateWithoutTenantInput[] | Prisma.UserTenantUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.UserTenantCreateOrConnectWithoutTenantInput | Prisma.UserTenantCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.UserTenantUpsertWithWhereUniqueWithoutTenantInput | Prisma.UserTenantUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.UserTenantCreateManyTenantInputEnvelope;
    set?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    disconnect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    delete?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    connect?: Prisma.UserTenantWhereUniqueInput | Prisma.UserTenantWhereUniqueInput[];
    update?: Prisma.UserTenantUpdateWithWhereUniqueWithoutTenantInput | Prisma.UserTenantUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.UserTenantUpdateManyWithWhereWithoutTenantInput | Prisma.UserTenantUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.UserTenantScalarWhereInput | Prisma.UserTenantScalarWhereInput[];
};
export type UserTenantCreateWithoutUserInput = {
    id?: string;
    role?: string;
    tenant: Prisma.TenantCreateNestedOneWithoutUsersInput;
};
export type UserTenantUncheckedCreateWithoutUserInput = {
    id?: string;
    tenantId: string;
    role?: string;
};
export type UserTenantCreateOrConnectWithoutUserInput = {
    where: Prisma.UserTenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserTenantCreateWithoutUserInput, Prisma.UserTenantUncheckedCreateWithoutUserInput>;
};
export type UserTenantCreateManyUserInputEnvelope = {
    data: Prisma.UserTenantCreateManyUserInput | Prisma.UserTenantCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserTenantUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserTenantWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserTenantUpdateWithoutUserInput, Prisma.UserTenantUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserTenantCreateWithoutUserInput, Prisma.UserTenantUncheckedCreateWithoutUserInput>;
};
export type UserTenantUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserTenantWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserTenantUpdateWithoutUserInput, Prisma.UserTenantUncheckedUpdateWithoutUserInput>;
};
export type UserTenantUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserTenantScalarWhereInput;
    data: Prisma.XOR<Prisma.UserTenantUpdateManyMutationInput, Prisma.UserTenantUncheckedUpdateManyWithoutUserInput>;
};
export type UserTenantScalarWhereInput = {
    AND?: Prisma.UserTenantScalarWhereInput | Prisma.UserTenantScalarWhereInput[];
    OR?: Prisma.UserTenantScalarWhereInput[];
    NOT?: Prisma.UserTenantScalarWhereInput | Prisma.UserTenantScalarWhereInput[];
    id?: Prisma.StringFilter<"UserTenant"> | string;
    userId?: Prisma.StringFilter<"UserTenant"> | string;
    tenantId?: Prisma.StringFilter<"UserTenant"> | string;
    role?: Prisma.StringFilter<"UserTenant"> | string;
};
export type UserTenantCreateWithoutTenantInput = {
    id?: string;
    role?: string;
    user: Prisma.UserCreateNestedOneWithoutTenantsInput;
};
export type UserTenantUncheckedCreateWithoutTenantInput = {
    id?: string;
    userId: string;
    role?: string;
};
export type UserTenantCreateOrConnectWithoutTenantInput = {
    where: Prisma.UserTenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserTenantCreateWithoutTenantInput, Prisma.UserTenantUncheckedCreateWithoutTenantInput>;
};
export type UserTenantCreateManyTenantInputEnvelope = {
    data: Prisma.UserTenantCreateManyTenantInput | Prisma.UserTenantCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type UserTenantUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.UserTenantWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserTenantUpdateWithoutTenantInput, Prisma.UserTenantUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.UserTenantCreateWithoutTenantInput, Prisma.UserTenantUncheckedCreateWithoutTenantInput>;
};
export type UserTenantUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.UserTenantWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserTenantUpdateWithoutTenantInput, Prisma.UserTenantUncheckedUpdateWithoutTenantInput>;
};
export type UserTenantUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.UserTenantScalarWhereInput;
    data: Prisma.XOR<Prisma.UserTenantUpdateManyMutationInput, Prisma.UserTenantUncheckedUpdateManyWithoutTenantInput>;
};
export type UserTenantCreateManyUserInput = {
    id?: string;
    tenantId: string;
    role?: string;
};
export type UserTenantUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserTenantUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserTenantUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserTenantCreateManyTenantInput = {
    id?: string;
    userId: string;
    role?: string;
};
export type UserTenantUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTenantsNestedInput;
};
export type UserTenantUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserTenantUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type UserTenantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tenantId?: boolean;
    role?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userTenant"]>;
export type UserTenantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tenantId?: boolean;
    role?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userTenant"]>;
export type UserTenantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tenantId?: boolean;
    role?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userTenant"]>;
export type UserTenantSelectScalar = {
    id?: boolean;
    userId?: boolean;
    tenantId?: boolean;
    role?: boolean;
};
export type UserTenantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "tenantId" | "role", ExtArgs["result"]["userTenant"]>;
export type UserTenantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserTenantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserTenantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserTenantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserTenant";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        tenantId: string;
        role: string;
    }, ExtArgs["result"]["userTenant"]>;
    composites: {};
};
export type UserTenantGetPayload<S extends boolean | null | undefined | UserTenantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserTenantPayload, S>;
export type UserTenantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserTenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserTenantCountAggregateInputType | true;
};
export interface UserTenantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserTenant'];
        meta: {
            name: 'UserTenant';
        };
    };
    findUnique<T extends UserTenantFindUniqueArgs>(args: Prisma.SelectSubset<T, UserTenantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserTenantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserTenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserTenantFindFirstArgs>(args?: Prisma.SelectSubset<T, UserTenantFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserTenantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserTenantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserTenantFindManyArgs>(args?: Prisma.SelectSubset<T, UserTenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserTenantCreateArgs>(args: Prisma.SelectSubset<T, UserTenantCreateArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserTenantCreateManyArgs>(args?: Prisma.SelectSubset<T, UserTenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserTenantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserTenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserTenantDeleteArgs>(args: Prisma.SelectSubset<T, UserTenantDeleteArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserTenantUpdateArgs>(args: Prisma.SelectSubset<T, UserTenantUpdateArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserTenantDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserTenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserTenantUpdateManyArgs>(args: Prisma.SelectSubset<T, UserTenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserTenantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserTenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserTenantUpsertArgs>(args: Prisma.SelectSubset<T, UserTenantUpsertArgs<ExtArgs>>): Prisma.Prisma__UserTenantClient<runtime.Types.Result.GetResult<Prisma.$UserTenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserTenantCountArgs>(args?: Prisma.Subset<T, UserTenantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserTenantCountAggregateOutputType> : number>;
    aggregate<T extends UserTenantAggregateArgs>(args: Prisma.Subset<T, UserTenantAggregateArgs>): Prisma.PrismaPromise<GetUserTenantAggregateType<T>>;
    groupBy<T extends UserTenantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserTenantGroupByArgs['orderBy'];
    } : {
        orderBy?: UserTenantGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserTenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserTenantFieldRefs;
}
export interface Prisma__UserTenantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserTenantFieldRefs {
    readonly id: Prisma.FieldRef<"UserTenant", 'String'>;
    readonly userId: Prisma.FieldRef<"UserTenant", 'String'>;
    readonly tenantId: Prisma.FieldRef<"UserTenant", 'String'>;
    readonly role: Prisma.FieldRef<"UserTenant", 'String'>;
}
export type UserTenantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    where: Prisma.UserTenantWhereUniqueInput;
};
export type UserTenantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    where: Prisma.UserTenantWhereUniqueInput;
};
export type UserTenantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    where?: Prisma.UserTenantWhereInput;
    orderBy?: Prisma.UserTenantOrderByWithRelationInput | Prisma.UserTenantOrderByWithRelationInput[];
    cursor?: Prisma.UserTenantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserTenantScalarFieldEnum | Prisma.UserTenantScalarFieldEnum[];
};
export type UserTenantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    where?: Prisma.UserTenantWhereInput;
    orderBy?: Prisma.UserTenantOrderByWithRelationInput | Prisma.UserTenantOrderByWithRelationInput[];
    cursor?: Prisma.UserTenantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserTenantScalarFieldEnum | Prisma.UserTenantScalarFieldEnum[];
};
export type UserTenantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    where?: Prisma.UserTenantWhereInput;
    orderBy?: Prisma.UserTenantOrderByWithRelationInput | Prisma.UserTenantOrderByWithRelationInput[];
    cursor?: Prisma.UserTenantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserTenantScalarFieldEnum | Prisma.UserTenantScalarFieldEnum[];
};
export type UserTenantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserTenantCreateInput, Prisma.UserTenantUncheckedCreateInput>;
};
export type UserTenantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserTenantCreateManyInput | Prisma.UserTenantCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserTenantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    data: Prisma.UserTenantCreateManyInput | Prisma.UserTenantCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserTenantIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserTenantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserTenantUpdateInput, Prisma.UserTenantUncheckedUpdateInput>;
    where: Prisma.UserTenantWhereUniqueInput;
};
export type UserTenantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserTenantUpdateManyMutationInput, Prisma.UserTenantUncheckedUpdateManyInput>;
    where?: Prisma.UserTenantWhereInput;
    limit?: number;
};
export type UserTenantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserTenantUpdateManyMutationInput, Prisma.UserTenantUncheckedUpdateManyInput>;
    where?: Prisma.UserTenantWhereInput;
    limit?: number;
    include?: Prisma.UserTenantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserTenantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    where: Prisma.UserTenantWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserTenantCreateInput, Prisma.UserTenantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserTenantUpdateInput, Prisma.UserTenantUncheckedUpdateInput>;
};
export type UserTenantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
    where: Prisma.UserTenantWhereUniqueInput;
};
export type UserTenantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserTenantWhereInput;
    limit?: number;
};
export type UserTenantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTenantSelect<ExtArgs> | null;
    omit?: Prisma.UserTenantOmit<ExtArgs> | null;
    include?: Prisma.UserTenantInclude<ExtArgs> | null;
};
export {};
