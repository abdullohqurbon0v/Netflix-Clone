import Account from "@/database/account";
import { connectToDataBase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { error } from "console";

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

export async function GET(req: Request) {
  try {
    await connectToDataBase();
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    if (!uid) {
      return NextResponse.json({
        message: "Accout id is mandatory",
        error: true,
      });
    }
    const accounts = await Account.find({ uid });

    return NextResponse.json({ error: false, accounts }, { status: 200 });
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

export async function DELETE(req: Request) {
  try {
    await connectToDataBase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        message: "Accout id is mandatory",
        error: true,
      });
    }

    await Account.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Account deleted successfuly",
        error: false,
      },
      { status: 200 }
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
