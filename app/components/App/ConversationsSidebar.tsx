import ConversationsNavigation from "./Navigation/ConversationsNavigation";

export type ConversationsSidebarProps = {
  conversations: any[];
  uid: string | undefined;
}

export default function ConversationsSidebar({conversations, uid}: ConversationsSidebarProps) {

  return (
    <>
      <div className="bg-white border-r border-whitish_border max-w-[400px] h-screen flex flex-grow flex-col">
        <div className="flex items-center h-[calc(8%+1px)] px-8 border-b border-whitish_border">
          <h1 className="font-medium">Conversations</h1>
        </div>
        <ConversationsNavigation conversations={conversations} uid={uid} />
      </div>
    </>
  );
}
