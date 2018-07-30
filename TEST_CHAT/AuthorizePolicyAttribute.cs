using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TEST_CHAT
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class AuthorizePolicyAttribute : AuthorizeAttribute
    {
        public AuthorizePolicyAttribute(params object[] policies)
        {
            if (policies.Any(r => r.GetType().BaseType != typeof(Enum)))
                throw new ArgumentException("policies");

            this.Policy = string.Join(",", policies.Select(r => Enum.GetName(r.GetType(), r)));
        }
    }
}
