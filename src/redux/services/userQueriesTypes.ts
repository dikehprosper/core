export type GetFriendsParams = {
   keyword?: string;
   pageSize?: number;
   sortBy?: string;
   page?: number
}

export type GetVisitationsParams = {
   keyword?: string;
   pageSize?: number;
   sortBy?: string;
   page?: number;
   endTime?: string;
   startTime?: string;
   category?: string;
   profileId?: string;
}

export type Friend = {
     id?: string;
     firstName: string;
     lastName: string;
     phoneNumber: string;
     alternatePhoneNumber?: string
     block: string;
     street: string;
     date: string;
     hasProfile: boolean;
     email?: string;
   
}
export type Verify = {
   timeLeft: number
}

export type Visitation = {
     firstName: string;
     lastName: string;
     phoneNumber: string;
     block: string;
     street: string;
     startTime: string;
     endTime: string;
     receiverStatus: string
}

export type GetFriendsResponse = {
   data: {
    friends: Friend[]
   }
}

export type GetFriendRequestsResponse = {
   data: {
    friendRequests: {
      received: { Sender: Friend }[];
      sent: { Recipient: Friend}[];
    }
   }
}

export type GetVisitationsResponse = {
   data: {
    visitationRequests: Visitation[]
   }
}

export type UpdateUserLoginProfilePayload = {
  lastLoggedInProfile?: string ;
  profileToLoginTo?: string | null;
}

export type CreateVisitationPayload = {
    startTime: string;
      endTime: string;
      purpose: string;
      hostId: string;
      description?: string;
}

export type CreateFriendRequestPayload = {
    email?: string;
      phoneNumber?: string;
   
}

type Contact = {
   name: string;
   phoneNumber: string;
}

export type GetContactsResponse = {
   data: {
      contacts: {
 registered: {
         nonFriends: Contact[],
         pendingRequests: Friend[]
      },
      unregistered: Contact[]
      }
     
   }
}

export type FriendsVisitMetricsResponse = {
   metrics: {
      friend_count: number;
      visit_count: number
   }
}

export type FriendVisitResponse = {
   friendDetails: Friend;
   pending?: {VisitationRequests: Visitation}[]
}

export type UserProfiles = {
   id: string;
   estate: {
      name: string;
   };
   type: "staff" | "resident";
   jobTitle: string;
   role: string;
}

export type GetUserProfiles ={
   profiles: UserProfiles[]
}

export type GetFriendProfiles ={
   data: {
      estate: {
         address: string;
      }
   }
}