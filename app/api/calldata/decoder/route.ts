import {
  CalldataDecoderRequest,
  calldataDecoderRequestSchema,
} from "@/data/schemas";
import { decodeWithAddress, decodeWithSelector } from "@/lib/decoder";
import { stringify } from "viem";

export const POST = async (request: Request) => {
  // validate request body
  let body: CalldataDecoderRequest;
  try {
    const requestBody = await request.json();
    body = calldataDecoderRequestSchema.parse(requestBody);
  } catch (error) {
    return Response.json(
      {
        error: "Invalid request body",
      },
      {
        status: 400,
      }
    );
  }

  // determine which function should be used to decode the calldata
  const shouldDecodeWithAddress = !!body.address && !!body.chainId;
  if (shouldDecodeWithAddress) {
    const decoded = await decodeWithAddress({
      calldata: body.calldata,
      // we can enforce that they exists because we're checking above
      address: body.address!,
      chainId: body.chainId!,
    });
    if (!decoded) {
      return Response.json(
        {
          error: "Failed to decode calldata with ABI for contract",
        },
        {
          status: 500,
        }
      );
    }
    // we need to use viem's stringify since the result includes a bigint and it is not serializable
    return Response.json(stringify(decoded));
  }
  const decoded = await decodeWithSelector({ calldata: body.calldata });
  if (!decoded) {
    return Response.json(
      {
        error: "Failed to decode calldata with selector",
      },
      {
        status: 500,
      }
    );
  }
  // we need to use viem's stringify since the result includes a bigint and it is not serializable
  return Response.json(stringify(decoded));
};
