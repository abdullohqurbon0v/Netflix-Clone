import Account from "@/database/account";
import { connectToDataBase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export const dynamic = "force-dynamic";
interface RequestBody {
  name: string;
  pin: string;
  uid: string;
}

export async function POST(req: Request) {
  try {
    await connectToDataBase();
    const { name, pin, uid }: RequestBody = await req.json();
    if (!name || !pin || !uid) {
      return NextResponse.json(
        {
          error: true,
          message: "Name, pin, and uid are required",
        },
        { status: 400 }
      );
    }

    const isExist = await Account.findOne({ name });
    if (isExist) {
      return NextResponse.json(
        {
          error: true,
          message: "User with this name already exists",
        },
        { status: 409 }
      );
    }
    const allAccounts = await Account.find({ uid });
    if (allAccounts.length >= 4) {
      return NextResponse.json(
        {
          error: true,
          message: "You can only have 4 accounts",
        },
        { status: 403 }
      );
    }

    const hashPin = await hash(pin, 10);

    const newAccount = await Account.create({
      name,
      pin: hashPin,
      uid,
    });

    return NextResponse.json(
      {
        message: "Successfully created user",
        user: {
          id: newAccount._id,
          name: newAccount.name,
          uid: newAccount.uid,
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error in POST /accounts:", e);
    return NextResponse.json(
      {
        error: true,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
