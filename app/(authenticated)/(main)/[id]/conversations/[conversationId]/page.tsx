import Chat from "@/app/components/App/Chat";
import TopBarChatActions from "@/app/components/App/TopBarChatActions";
import { cookies } from "next/headers";
import Image from "next/image";

const getConversationMessages = async (conversationId: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/conversations/${conversationId}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

async function getOtherUserInformations(conversationId: string): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/conversations/${conversationId}/other-user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
    cache: "no-store",
  });

  const { profile } = await response.json();

  return { profile };
}

export default async function Page({ params }: { params: { conversationId: string } }) {
  const conversation_id = typeof params.conversationId === "string" ? params.conversationId : "";
  const token = cookies().get("token")?.value;

  const conversation = await getConversationMessages(conversation_id, token!);
  const { profile: otherUser } = await getOtherUserInformations(conversation_id);

  let newConversationObject = conversation.map((message: any) => {
    return {
      id: message.id,
      content: message.content,
      sender_id: message.sender_id,
      receiver_id: message.receiver_id,
      is_read: message.is_read,
    };
  });

  const fullName = otherUser.first_name + " " + otherUser?.last_name

  console.log(otherUser);


  return (
    <>
      <div className="flex items-center min-h-[calc(8%)] px-10 bg-white flex-grow">
        <div className="font-semibold flex justify-between items-center w-full">
          <div className="flex gap-x-2 items-center">
            <Image src={otherUser.profile_picture} alt="profile picture" width={32} height={32} className="rounded-full w-[32px] h-[32px]" />
            <span>
              {otherUser.first_name} {otherUser.last_name}
            </span>
          </div>
          <div>
            <TopBarChatActions fullName={fullName} uid={otherUser.user_id}  />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between flex-col flex-grow border-t border-whitish_border">
        <Chat conversation_id={conversation_id} token={token} conversation={newConversationObject} otherUser={otherUser} />
      </div>
    </>
  );
}
