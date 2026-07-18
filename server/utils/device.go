package utils

import "strings"

func DetectDeviceType(userAgent string) string {

	if userAgent == "" {
		return "unknown"
	}

	ua := strings.ToLower(userAgent)

	switch {
	case strings.Contains(ua, "ipad"),
		strings.Contains(ua, "tablet"),
		strings.Contains(ua, "android") && !strings.Contains(ua, "mobile"):
		return "tablet"

	case strings.Contains(ua, "mobile"),
		strings.Contains(ua, "iphone"),
		strings.Contains(ua, "android"):
		return "mobile"

	default:
		return "desktop"
		
	}

}